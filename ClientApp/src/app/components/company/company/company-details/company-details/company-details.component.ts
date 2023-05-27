import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Building } from 'src/app/models/building.model';
import { BuildingService } from 'src/app/services/building.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent {
  companyId: any;
  buildingList!: Observable<Building[]>;
  buildingId: any;

  constructor(
    private companyService: CompanyService,
    private buildingService: BuildingService,
    private activatedRoute: ActivatedRoute) { }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.companyId = params.get('companyId');
      this.refreshBuildingList();
    })
  }

  addBuildingForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    addressControl: new FormControl('', [Validators.required]),
  });

  editBuildingForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    addressControl: new FormControl('', [Validators.required]),
  });

  displayAddModal: boolean = false;
  displayDeleteModal: boolean = false;
  displayEditModal: boolean = false;

  refreshBuildingList() {
    this.buildingList = this.companyService.getBuildingsByCompanyId(this.companyId);
  }
  addBuilding() {
    var newBuilding = new Building();
    newBuilding.name = this.addBuildingForm.controls.nameControl.value!
    newBuilding.address = this.addBuildingForm.controls.addressControl.value!
    newBuilding.companyId = this.companyId
    this.buildingService.addBuilding(newBuilding).subscribe(() => {
      this.refreshBuildingList();
    });
    this.hideAddDialog();
  }

  deleteBuilding(id?: string) {

    if (id !== undefined) {
      this.buildingService.deleteBuilding(id).subscribe(() => { this.refreshBuildingList(); });
    }
    this.hideDeleteDialog();
  }

  updateBuilding() {

    var building = {
      id: this.buildingId,
      name: this.editBuildingForm.controls.nameControl.value!,
      address: this.editBuildingForm.controls.addressControl.value!,
    }
    this.buildingService.updateBuilding(this.buildingId, building).subscribe(() => { this.refreshBuildingList(); });
    this.hideEditDialog();
  }

  // ======================= MODALS CONTROLS =====================================

  showAddDialog() {
    this.displayAddModal = true;
  }

  hideAddDialog() {
    this.displayAddModal = false;
  }

  showDeleteDialog(building: Building) {
    this.displayDeleteModal = true;
    if (building.id) {
      this.buildingId = building.id;
    }
  }

  hideDeleteDialog() {
    this.displayDeleteModal = false;
  }

  showEditDialog(building: Building) {
    this.displayEditModal = true;
    if (building.id) {
      this.buildingId = building.id;
    }

    this.editBuildingForm.controls.nameControl.setValue(building.name);
    this.editBuildingForm.controls.addressControl.setValue(building.address);
  }

  hideEditDialog() {
    this.displayEditModal = false;
  }
}
