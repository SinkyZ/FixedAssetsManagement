import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { BuildingService } from 'src/app/services/building.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css']
})
export class BuildingDetailsComponent {

  buildingId: any;
  roomList!: Observable<Room[]>;
  roomIdToDelete: any;
  roomId: any;

  constructor(
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute) {}

    getEventValue($event: any): string {
      return $event.target.value;
    }
    
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.buildingId = params.get('buildingId');
        this.refreshRoomList();
      })
    }

    addRoomForm = new FormGroup({
      numberControl: new FormControl('', [Validators.required]),
    });
  
    editRoomForm = new FormGroup({
      numberControl: new FormControl('', [Validators.required]),
    });
    
    displayAddModal: boolean = false;
    displayDeleteModal: boolean = false;
    displayEditModal: boolean = false;

    refreshRoomList() {
      this.roomList = this.roomService.getRoomsByBuildingId(this.buildingId);
    }
    addRoom() {
      var newRoom = new Room();
      newRoom.number = this.addRoomForm.controls.numberControl.value!
      newRoom.buildingId = this.buildingId
      this.roomService.addRoom(newRoom).subscribe(() => {
        this.refreshRoomList();
      });
      this.hideAddDialog();
    }

    deleteRoom(id?: string)
  {
    if(id!==undefined) 
    {
      this.roomService.deleteRoom(id).subscribe(()=>{this.refreshRoomList();});
    }
    this.hideDeleteDialog();
  }

  updateRoom()
  {
    var room ={
      id: this.roomId,
      number: this.editRoomForm.controls.numberControl.value!,
    }
    this.roomService.updateRoom(this.roomId, room).subscribe(()=>{this.refreshRoomList();});
    this.hideEditDialog();
  }

  // ======================= MODALS CONTROLS =====================================

  showAddDialog(){
    this.displayAddModal = true;
  }

  hideAddDialog(){
    this.displayAddModal = false;
  }
  showDeleteDialog(room: Room) {
    this.displayDeleteModal = true;
    if(room.id){
      this.buildingId = room.id;
    }
  }

  hideDeleteDialog(){
    this.displayDeleteModal = false;
  }

  showEditDialog(room: Room){
    this.displayEditModal = true;
    if(room.id)
    {
      this.roomId=room.id;
    }
    this.editRoomForm.controls.numberControl.setValue(room.number);
  }

  hideEditDialog()
  {
    this.displayEditModal = false;
  }
}
