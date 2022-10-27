import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, UserResponse } from 'src/app/pages/users/interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {
  user!: User;
  

  private errorResponse!: HttpErrorResponse;
  private userSubject = new Subject<User>;

  get userAction$(): Observable<User> {
    return this.userSubject.asObservable();
  }

  private unsetUser(): void {
    this.user.username = '';
    this.user.password = '';

    this.userSubject.next(this.user);
  }

  private setUser(user: User): void {
    this.userSubject.next(user);
  }

  setUserFromResponse(userResponse: UserResponse): void {
    this.setUser(userResponse.User);
  }

  setErrorResponse(errorResponse: HttpErrorResponse): void {
    this.errorResponse = errorResponse;
  }
}
