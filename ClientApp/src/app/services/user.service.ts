import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "users";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/${this.url}`);
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
}
