import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DefaultCategories } from 'src/app/components/assets/category/category/category-defines';
import { Asset } from 'src/app/models/asset.model';
import { AssetsService } from 'src/app/services/assets.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent {

  assetId: any;
  roomId: any;
  assetList!: Observable<Asset[]>;
  categories = DefaultCategories.AllCategories;

  constructor(
    private roomService: RoomService,
    private assetService: AssetsService,
    private activatedRoute: ActivatedRoute) { }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.roomId = params.get('roomId');
      this.refreshAssetList();
    })
  }

  addAssetForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    descriptionControl: new FormControl('', [Validators.required]),
    categoryControl: new FormControl('', [Validators.required]),
  });

  editAssetForm = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    descriptionControl: new FormControl('', [Validators.required]),
    categoryControl: new FormControl('', [Validators.required]),
  });

  displayAddModal: boolean = false;
  displayDeleteModal: boolean = false;
  displayEditModal: boolean = false;

  refreshAssetList() {
    this.assetList = this.roomService.getAssetsByRoomId(this.roomId);
  }

  addAsset() {
    var newAsset = new Asset();
    newAsset.name = this.addAssetForm.controls.nameControl.value!
    newAsset.description = this.addAssetForm.controls.descriptionControl.value!
    newAsset.category = this.addAssetForm.controls.categoryControl.value!
    newAsset.roomId = this.roomId
    this.assetService.addAsset(newAsset).subscribe(() => {
      this.refreshAssetList();
    });
    this.hideAddDialog();
  }

  deleteAsset(id?: string) {
    if (id !== undefined) {
      this.assetService.deleteAsset(id).subscribe(() => { this.refreshAssetList(); });
    }
    this.hideDeleteDialog();
  }

  updateAsset() {
    var asset = {
      id: this.assetId,
      name: this.editAssetForm.controls.nameControl.value!,
      description: this.editAssetForm.controls.descriptionControl.value!,
      category: this.editAssetForm.controls.categoryControl.value!
    }
    this.assetService.updateAsset(this.assetId, asset).subscribe(() => { this.refreshAssetList(); });
    this.hideEditDialog();
  }

  onCriteriaChange(event: any, asset: Asset): void {
    console.log("Updated criteria with id: " + event.target.id + "; selected value: " + event.target.value);

    asset.isWorking = event.target.value;
    asset.id = event.target.id;

    console.log(asset);
    this.assetService.updateAssetStatus(event.target.id, asset).subscribe(() => { this.refreshAssetList(); });
  }

  // ======================= MODALS CONTROLS =====================================

  showAddDialog() {
    this.displayAddModal = true;
  }

  hideAddDialog() {
    this.displayAddModal = false;
  }
  showDeleteDialog(asset: Asset) {
    this.displayDeleteModal = true;
    if (asset.id) {
      this.assetId = asset.id;
    }
  }

  hideDeleteDialog() {
    this.displayDeleteModal = false;
  }

  showEditDialog(asset: Asset) {
    this.displayEditModal = true;

    if (asset.id) {
      this.assetId = asset.id;
    }

    this.editAssetForm.controls.nameControl.setValue(asset.name);
    this.editAssetForm.controls.descriptionControl.setValue(asset.description);
    this.editAssetForm.controls.categoryControl.setValue(asset.category);
  }

  hideEditDialog() {
    this.displayEditModal = false;
  }
}
