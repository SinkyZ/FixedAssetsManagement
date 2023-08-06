import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { UserAuthService } from '../auth/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "users";

  private authUrl = "auth"

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient,
    private userAuthService: UserAuthService) { }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getRoomsByUserId(userId: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`${environment.apiUrl}/${this.url}/user/${userId}`);
  }

  public getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/${this.url}/${email}`);
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

  public assignRoomToAnUser(id: string, roomId: string): Observable<any> {
    console.log(roomId);
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.url}/userDetails/${id}/${roomId}`, null);
  }

  public login(loginData: any) {
    return this.httpClient.post(`${environment.apiUrl}/${this.authUrl}/authenticate`, loginData, {
      headers: this.requestHeader,
    });
  }

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRole: any = this.userAuthService.getRole();

    if (userRole != null && userRole) {
      for (let i = 0; i < allowedRoles.length; i++) {
        if (userRole === allowedRoles[i]) {
          isMatch = true;
          return isMatch;
        }
      }
    }
    return isMatch;
  }
}
