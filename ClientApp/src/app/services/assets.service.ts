import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asset } from '../models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private url = 'room/assets';

  constructor(private httpClient: HttpClient) { }

  public getAllAssets(): Observable<Asset[]> {
    return this.httpClient.get<Asset[]>(`${environment.apiUrl}/${this.url}`);
  }
  public getAssetById(id: number): Observable<Asset> {
    return this.httpClient.get<Asset>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  public addAsset(asset: Asset): Observable<Asset> {
    return this.httpClient.post<Asset>(`${environment.apiUrl}/${this.url}`, asset);
  }
  public deleteAsset(id: string): Observable<Asset> {
    return this.httpClient.delete<Asset>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  public updateAsset(id: string, asset: Asset): Observable<Asset> {
    console.log(asset);
    return this.httpClient.put<Asset>(`${environment.apiUrl}/${this.url}/${id}`, asset);
  }
  public updateAssetStatus(id: string, asset: Asset): Observable<Asset> {
    return this.httpClient.put<Asset>(`${environment.apiUrl}/${this.url}/status/${id}`, asset);
  }
}