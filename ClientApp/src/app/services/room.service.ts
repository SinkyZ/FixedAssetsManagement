import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = "companies/buildings/rooms";

  constructor(private httpClient: HttpClient) { }

  public getRoomsByBuildingId(buildingId: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`${environment.apiUrl}/${this.url}/building/${buildingId}`);
  }

  public getRoomById(id: number): Observable<Room> {
    return this.httpClient.get<Room>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(`${environment.apiUrl}/${this.url}`, room);
  }
  public deleteRoom(id: string): Observable<Room> {
    return this.httpClient.delete<Room>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  public updateRoom(id: string, room: Room): Observable<Room> {
    return this.httpClient.put<Room>(`${environment.apiUrl}/${this.url}/${id}`, room);
  }
}
