import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/models/asset.model';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  assetList!: Observable<Asset[]>;
  assetIdToDelete: any;
  assetId: any;
  displayAddAssetModal: boolean = false;
  displayDeleteAssetModal: boolean = false;
  displayEditModal: boolean = false;
  constructor(private assetsService: AssetsService) { }

  ngOnInit(): void {
    this.refreshAssetList();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  refreshAssetList() {
    this.assetList = this.assetsService.getAllAssets();
  }
}
