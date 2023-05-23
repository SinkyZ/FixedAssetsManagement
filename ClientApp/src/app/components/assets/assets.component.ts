import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Asset } from 'src/app/models/asset.model';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  assetList!: Asset[];
  assetIdToDelete: any;
  assetId : any;
  displayAddAssetModal: boolean = false;
  displayDeleteAssetModal: boolean = false;
  displayEditModal: boolean = false;
  constructor(private assetsService: AssetsService) { }

  ngOnInit(): void {
    this.refreshAssetList();
  }

  addAssetFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
  });

  editAssetFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
  });

  showAddDialog() {
    this.displayAddAssetModal = true;
  }
  hideAddDialog() {
    this.displayAddAssetModal = false;
  }

  showDeleteDialog(asset: Asset) {
    this.displayDeleteAssetModal = true;
    if(asset.id){
      this.assetIdToDelete = asset.id;
    }
  }

  hideDeleteDialog(){
    this.displayDeleteAssetModal = false;
  }

  showEditDialog(asset:Asset){
    this.displayEditModal = true;
    if(asset.id)
    {
      this.assetId=asset.id;
    }
    this.editAssetFormGroup.controls.nameControl.setValue(asset.name);
  }

  hideEditDialog()
  {
    this.displayEditModal = false;
  }

  refreshAssetList() {
    this.assetsService.getAllAssets().subscribe({
      next: (asset) => {
        this.assetList = asset;
      }
    })
  }

  addAsset() {
    var newAsset = new Asset();
    newAsset.name = this.addAssetFormGroup.controls.nameControl.value!
    this.assetsService.addAsset(newAsset).subscribe(() => {
      this.refreshAssetList();
    });
    this.hideAddDialog();
  }

  deleteAsset(id?: number)
  {
    if(id!==undefined) 
    {
      this.assetsService.deleteAsset(id).subscribe(()=>{this.refreshAssetList();});
    }
    this.hideDeleteDialog();
  }

  updateAsset()
  {
    var asset ={
      id: this.assetId,
      name: this.editAssetFormGroup.controls.nameControl.value!,
    }
    console.log(asset.name);
    this.assetsService.updateAsset(asset).subscribe(()=>{this.refreshAssetList();});
    this.hideEditDialog();
  }
}
