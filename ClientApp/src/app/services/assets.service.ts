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
  private url = 'assets';

  constructor(private httpClient: HttpClient) { }

  public getAllAssets(): Observable<Asset[]> {
    return this.httpClient.get<Asset[]>(`${environment.apiUrl}/${this.url}`);
  }
  public getEmployeeById(id: number): Observable<Asset> {
    return this.httpClient.get<Asset>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  public addAsset(asset: Asset): Observable<Asset> {
    return this.httpClient.post<Asset>(`${environment.apiUrl}/${this.url}`, asset);
  }
  public deleteAsset(id: number): Observable<Asset> {
    return this.httpClient.delete<Asset>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  public updateAsset(asset:Asset): Observable<Asset>
  {
    return this.httpClient.put<Asset>(`${environment.apiUrl}/${this.url}`,asset);
  }
}