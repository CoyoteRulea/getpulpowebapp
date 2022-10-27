import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { GlobalLoggedUser } from 'src/app/global/service/logged-user.service';
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

  constructor(private brandService: BrandsService, private router: Router, private globalLoggedUser: GlobalLoggedUser) { }

  ngOnInit(): void {
    // if (!this.globalLoggedUser.isLogged()) {
    //   this.router.navigateByUrl("/users/login"); 
    // }
    
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
