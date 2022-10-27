import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
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

  constructor(private colorsService: ColorsService) { }

  ngOnInit(): void {
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
