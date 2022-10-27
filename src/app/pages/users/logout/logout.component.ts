import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { UserResponse } from '../interfaces/users.interface';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  errorMessage!: string;
  successMessage!: string;

  constructor(private usersService: UsersService, private router: Router) { 
    this.usersService.getLogOut()
      .pipe(
        tap(
          (userResponse: UserResponse) => 
          !userResponse || userResponse['statusCode'] == 409 ? 
            this.errorMessage = 
              'Something goes wrong: ' + (userResponse['statusCode'] == 409 ? userResponse['msg'] : 'Unexpected error.') : 
              this.successMessage = 'LoggedOut'
        )
      )
      .subscribe(
        (data) => {
        if (this.successMessage)
          setTimeout(() => { this.router.navigateByUrl("/users"); }, 2000);
        }
      )
  }

  ngOnInit(): void {
  }

}
