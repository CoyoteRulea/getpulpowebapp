import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/internal/operators/tap';
import { UserResponse } from '../interfaces/users.interface';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage!: string;
  successMessage!: string;

  signupForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl('')
  });

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.signupForm.value.username) {
      this.errorMessage = 'Username couldn\'t be empty';
      return;
    }

    if (!this.signupForm.value.password) {
      this.errorMessage = 'Password couldn\'t be empty';
      return;
    }

    if (this.signupForm.value.password != this.signupForm.value.repassword) {
      this.errorMessage = 'Password and repeat password doesn\'t match.';
      return;
    }
    
    this.usersService.postSignUp(this.signupForm.value)
      .pipe(
        tap(
          (userResponse: UserResponse) => 
          !userResponse || userResponse['statusCode'] == 409 ? 
            this.errorMessage = 
              'Something goes wrong: ' + (userResponse['statusCode'] == 409 ? userResponse['msg'] : 'Unexpected error.') : 
              this.successMessage = 'New user created'
        )
      )
      .subscribe((data) => {
        if (this.successMessage)
          setTimeout(() => { this.router.navigateByUrl("/user/login"); }, 3000);
      }
      );    
  }
}
