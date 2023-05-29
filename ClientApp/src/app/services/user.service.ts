import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "users";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getRoomsByUserId(userId: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`${environment.apiUrl}/${this.url}/user/${userId}`);
  }

  public getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/${this.url}`, user);
  }

  public deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiUrl}/${this.url}/${id}`, user);
  }

  public assignRoomToAnUser(id: string, roomId: string): Observable<any>{
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.url}/userDetails/${id}/${roomId}`, null);
  }
}
