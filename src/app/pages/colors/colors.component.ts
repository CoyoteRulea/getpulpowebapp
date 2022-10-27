import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { GlobalLoggedUser } from 'src/app/global/service/logged-user.service';
import { Color } from './interfaces/colors.interface';
import { ColorsService } from './service/colors.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {
  colors!: Color[];
  searchBox!: string;
  errorMessage!: string;

  constructor(private colorsService: ColorsService, private router: Router, private globalLoggedUser: GlobalLoggedUser) { }

  ngOnInit(): void {
    // if (!this.globalLoggedUser.isLogged()) {
    //   this.router.navigateByUrl("/users/login"); 
    // }
    this.getColorList();
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.colorsService.postColorByCode(this.searchBox)
      .pipe(
        tap(
          (colorResponse: Color) => 
              !colorResponse ? this.errorMessage = 'Code ' + this.searchBox + ' doesn\'t exists.' : this.colors = [ colorResponse ]
        )
      )
      .subscribe();
  }

  getColorList() {
    this.errorMessage = '';
    this.searchBox = '';

    this.colorsService.getColors()
      .pipe(
        tap((colorsResponse: Color[]) => this.colors = colorsResponse)
      )
      .subscribe();
  }
}
