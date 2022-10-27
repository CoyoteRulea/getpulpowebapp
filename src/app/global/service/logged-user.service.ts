import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, UserResponse } from 'src/app/pages/users/interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class GlobalLoggedUser {
  private user!: User;
  

  private errorResponse!: HttpErrorResponse;

  private unsetUser(): void {
    this.user._id = '';
    this.user.username = '';
    this.user.password = '';
  }

  public logOut() {
    this.unsetUser();
  }

  public isLogged(): boolean {
    return this.user !== undefined && this.user.username !== '';
  }

  public getUserName() {
    return this.user !== undefined ? this.user.username : '';
  }

  private setUser(user: User): void {
    this.user = user;
  }

  setUserFromResponse(userResponse: UserResponse): void {
    this.setUser(userResponse.User);
  }

  setErrorResponse(errorResponse: HttpErrorResponse): void {
    this.errorResponse = errorResponse;
  }
}
