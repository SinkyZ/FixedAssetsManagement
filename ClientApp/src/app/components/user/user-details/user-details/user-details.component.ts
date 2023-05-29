import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { User } from 'src/app/models/user.model';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  constructor(private userService: UserService,
              private roomService: RoomService,
              private activatedRoute: ActivatedRoute) { }

  roomListObs!: Observable<Room[]>;
  allRoomList!: Room[];
  userId: any;
  roomId: any;
  user!: User;
  displayAddModal: boolean = false;

  assignRoomToUserGroup = new FormGroup({
    roomControl: new FormControl('', [Validators.required]),
  });

  getEventValue($event: any): string {
    return $event.target.value;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
      //this.roomId = params.get('roomId');
      this.userService.getUserById(this.userId).subscribe((res) =>
      {
        this.user = res;
      });

      this.roomService.getAllRooms().subscribe((res) =>
      {
        this.allRoomList = res;
      });

      this.refreshRoomList();
    })
  }

  refreshRoomList() {
    this.roomListObs = this.userService.getRoomsByUserId(this.userId);
  }

  assignRoomToUser(){
    this.userService.assignRoomToAnUser(this.userId, this.roomId).subscribe(() => { this.refreshRoomList(); });
  }

  onRoomChange(event: any) {
    this.roomId = event.value;
  }

  showAddDialog() {
    this.displayAddModal = true;
  }

  hideAddDialog() {
    this.displayAddModal = false;
  }
}
