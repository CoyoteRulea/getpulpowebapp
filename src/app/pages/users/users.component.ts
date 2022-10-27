import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserResponse } from './interfaces/users.interface';
import { UsersService } from './service/users.service';
import { Router } from "@angular/router";
import { LoggedUserService } from 'src/app/global/service/logged-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private usersService: UsersService, private loggedUserService: LoggedUserService, private router: Router) { }

  ngOnInit(): void {
    this.usersService.getProtected()
      .pipe(
        tap((usersResponse: UserResponse) => this.loggedUserService.setUserFromResponse(usersResponse))
      )
      .subscribe(
        (data: any) => {
          console.log("data back", data)
        },
        (error: HttpErrorResponse) => {
          this.loggedUserService.setErrorResponse(error);
          this.router.navigate(['/users/login', 5]);
        }
      );
  }
}