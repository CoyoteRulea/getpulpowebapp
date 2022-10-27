import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Brand } from './interfaces/brands.interface';
import { BrandsService } from './service/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  brands!: Brand[];
  searchBox!: string;
  errorMessage!: string;

  constructor(private brandService: BrandsService) { }

  ngOnInit(): void {
    this.getBrandList();
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.brandService.postBrandByCode(this.searchBox)
      .pipe(
        tap(
          (brandResponse: Brand) => 
              !brandResponse ? this.errorMessage = 'Code ' + this.searchBox + ' doesn\'t exists.' : this.brands = [ brandResponse ]
        )
      )
      .subscribe();
  }

  getBrandList() {
    this.errorMessage = '';
    this.searchBox = '';

    this.brandService.getBrands()
      .pipe(
        tap((brandsResponse: Brand[]) => this.brands = brandsResponse)
      )
      .subscribe();
  }
}
