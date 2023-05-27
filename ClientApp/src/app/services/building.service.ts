import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Building } from '../models/building.model';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private url = "buildings";

  constructor(private httpClient: HttpClient) { }

  public getRoomsByBuildingId(buildingId: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`${environment.apiUrl}/${this.url}/building/${buildingId}`);
  }

  public getBuildingById(id: number): Observable<Building> {
    return this.httpClient.get<Building>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addBuilding(building: Building): Observable<Building> {
    return this.httpClient.post<Building>(`${environment.apiUrl}/${this.url}`, building);
  }

  public deleteBuilding(id: string): Observable<Building> {
    return this.httpClient.delete<Building>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public updateBuilding(id: string, building: Building): Observable<Building> {
    return this.httpClient.put<Building>(`${environment.apiUrl}/${this.url}/${id}`, building);
  }

}
