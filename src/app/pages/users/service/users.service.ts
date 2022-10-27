import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private jsonRequests;

  constructor(private http: HttpClient) {
    this.jsonRequests = JSON.parse(environment.usersRequests);
  }

  postSignUp(user: User): Observable<User> {
    let thisMethod = 'postSignUp';
    return this.http.post<User>(environment.apiUrl + this.jsonRequests[thisMethod], user);
  }
  
  postLogin(user: User): Observable<User> {
    let thisMethod = 'postLogin';
    return this.http.post<User>(environment.apiUrl + this.jsonRequests[thisMethod], { username: user.username, password: user.password });
  }
  
  getLogOut(): Observable<User> {
    let thisMethod = 'getLogOut';
    return this.http.get<any>(environment.apiUrl + this.jsonRequests[thisMethod]);
  }
  
  getProtected(): any {
    let thisMethod = 'getProtected';
    return this.http.get<any>(environment.apiUrl + this.jsonRequests[thisMethod]);
  }
}
