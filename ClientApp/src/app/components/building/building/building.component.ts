import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Building } from 'src/app/models/building.model';
import { BuildingService } from 'src/app/services/building.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent {

  constructor(private buildingService: BuildingService,
              private companyService: CompanyService,
              private activatedRoute: ActivatedRoute,) {}

  buildingList!: Observable<Building[]>;
  buildingIdToDelete: any;
  buildingId: any;
  companyId: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.companyId = params.get('id');
      this.refreshBuildingList();
    })
  }

  addBuildingForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    adressControl: new FormControl('',[Validators.required]),
  });

  editBuildingForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    adressControl: new FormControl('',[Validators.required]),
  });
  
  displayAddModal: boolean = false;
  displayDeleteModal: boolean = false;
  displayEditModal: boolean = false;

  addBuilding() {
    var newBuilding = new Building();
    newBuilding.name = this.addBuildingForm.controls.nameControl.value!
    //newBuilding.adress = this.addBuildingForm.controls.adressControl.value!
    newBuilding.companyId = this.companyId
    this.buildingService.addBuilding(newBuilding).subscribe(() => {
      this.refreshBuildingList();
    });
    this.hideAddDialog();
  }

  refreshBuildingList() {
    this.buildingList = this.companyService.getBuildingsByCompanyId(this.companyId)
      .pipe(
        tap((buildings) => {
        })
      );
  }

  deleteBuilding(id?: string)
  {
    if(id!==undefined) 
    {
      this.buildingService.deleteBuilding(id).subscribe(()=>{this.refreshBuildingList();});
    }
    this.hideDeleteDialog();
  }

  updateBuilding()
  {
    console.log(this.buildingId);
    var building ={
      id: this.buildingId,
      name: this.editBuildingForm.controls.nameControl.value!,
      adress: this.editBuildingForm.controls.adressControl.value!,
    }
    //this.buildingService.updateBuilding(this.buildingId, building).subscribe(()=>{this.refreshBuildingList();});
    this.hideEditDialog();
  }

  // ======================= MODALS CONTROLS =====================================

  showAddDialog(){
    this.displayAddModal = true;
  }

  hideAddDialog(){
    this.displayAddModal = false;
  }
  showDeleteDialog(building: Building) {
    this.displayDeleteModal = true;
    if(building.id){
      this.buildingId = building.id;
    }
  }

  hideDeleteDialog(){
    this.displayDeleteModal = false;
  }

  showEditDialog(buidling: Building){
    this.displayEditModal = true;
    if(buidling.id)
    {
      this.buildingId=buidling.id;
    }
    console.log(buidling);
    this.editBuildingForm.controls.nameControl.setValue(buidling.name);
  }

  hideEditDialog()
  {
    this.displayEditModal = false;
  }
}
