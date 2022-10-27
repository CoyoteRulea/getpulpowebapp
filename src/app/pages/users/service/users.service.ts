import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User, UserResponse } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private jsonRequests;

  constructor(private http: HttpClient) {
    this.jsonRequests = JSON.parse(environment.usersRequests);
  }

  postSignUp(signupFormValue: any): Observable<UserResponse> {
    let thisMethod = 'postSignUp';
    
    let paramsRequest: HttpParams = new HttpParams()
                                          .set('username', signupFormValue.username)
                                          .set('password', signupFormValue.password);

    return this.http.post<UserResponse>(environment.apiUrl + this.jsonRequests[thisMethod], paramsRequest);
  }
  
  postLogin(loginFormValue: any): Observable<UserResponse> {
    let thisMethod = 'postLogin';

    let paramsRequest: HttpParams = new HttpParams()
                                          .set('username', loginFormValue.username)
                                          .set('password', loginFormValue.password);
    return this.http.post<UserResponse>(environment.apiUrl + this.jsonRequests[thisMethod], paramsRequest);
  }
  
  getLogOut(): Observable<UserResponse> {
    let thisMethod = 'getLogOut';
    return this.http.get<UserResponse>(environment.apiUrl + this.jsonRequests[thisMethod]);
  }
  
  getProtected(): Observable<UserResponse> {
    let thisMethod = 'getProtected';
    return this.http.get<UserResponse>(environment.apiUrl + this.jsonRequests[thisMethod]);
  }
}
