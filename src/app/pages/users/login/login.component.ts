import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { GlobalLoggedUser } from 'src/app/global/service/logged-user.service';
import { UserResponse } from '../interfaces/users.interface';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage!: string;
  successMessage!: string;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private usersService: UsersService, private router: Router, private globalLoggedUser: GlobalLoggedUser) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.loginForm.value.username) {
      this.errorMessage = 'Username couldn\'t be empty';
      return;
    }

    if (!this.loginForm.value.password) {
      this.errorMessage = 'Password couldn\'t be empty';
      return;
    } 

    this.usersService.postLogin(this.loginForm.value)
      .pipe(
        tap(
          (userResponse: UserResponse) => 
          !userResponse || userResponse['statusCode'] == 409 || userResponse['statusCode'] == 401 ? 
            this.errorMessage = 
              'Something goes wrong: ' + (userResponse['statusCode'] == 406 || userResponse['statusCode'] == 401 ? 'User doesn\'t exists or password wrong' : 'Unexpected error.') : 
              this.successMessage = 'Acces Granted'
        )
      )
      .subscribe((data: UserResponse) => {
        if (this.successMessage) {
          this.globalLoggedUser.setUserFromResponse(data);
          setTimeout(() => { this.router.navigateByUrl("/users").then(() => { this.router.navigate(['HeaderComponent']) }); }, 2000);
        }
      },
      (error) => {
        console.log(error);
        this.errorMessage = error['error']['statusCode'] + ' ' + error['error']['message'];
      });    
  }
}
