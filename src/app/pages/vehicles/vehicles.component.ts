import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Brand } from '../brands/interfaces/brands.interface';
import { BrandsService } from '../brands/service/brands.service';
import { Color } from '../colors/interfaces/colors.interface';
import { ColorsService } from '../colors/service/colors.service';
import { Vehicle, VehicleResponse } from './interfaces/vehicles.interface';
import { VehiclesService } from './service/vehicles.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/global/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { GlobalLoggedUser } from 'src/app/global/service/logged-user.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicles!: Vehicle[];
  colorList!: Color[];
  brandList!: Brand[];
  errorMessage!: string;
  successMessage!: string;
  
  searchForm = new FormGroup({
    _id:        new FormControl(''),
    vehicle_id: new FormControl(''),
    brand:      new FormControl(''),
    model:      new FormControl(''),
    color:      new FormControl(''),
    status:     new FormControl(''),
    assigned:   new FormControl('')
  });

  constructor(
        private vehiclesService: VehiclesService,
        private colorsService: ColorsService,
        private brandsService: BrandsService,
        private confirmDialog: MatDialog, 
        private router: Router,
        private globalLoggedUser: GlobalLoggedUser) {

    colorsService.getColors()
    .pipe(
      tap(
        (colorsResponse: Color[]) => 
            !colorsResponse ? this.errorMessage = 'Something goes wrong.' : this.colorList = colorsResponse
      )
    )
    .subscribe();

    brandsService.getBrands()
    .pipe(
      tap(
        (brandsResponse: Brand[]) => 
            !brandsResponse ? this.errorMessage = 'Something goes wrong.' : this.brandList = brandsResponse
      )
    )
    .subscribe();

   }

  ngOnInit(): void {
    // if (!this.globalLoggedUser.isLogged()) {
    //   this.router.navigateByUrl("/users/login"); 
    // }

    this.getVehiclesList();
  }

  getBrand(code: string): string {
    for (let brand of this.brandList) {
      if (brand.brand_code == code) {
        return brand.brand;
      }
    }

    return '';
  }

  getColor(code: string): string {

    for (let color of this.colorList) {
      if (color.color_code == code) {
        return color.color;
      }
    }

    return '';
  }

  clearForm() {
    this.searchForm.reset();
    
    this.vehiclesService.postFindByFields(this.searchForm.value)
    .pipe(
      tap(
        (vehiclesResponse: Vehicle[]) => 
            !vehiclesResponse ? this.errorMessage = 'Something goes wrong.' : this.vehicles = vehiclesResponse
      )
    )
    .subscribe();
  }

  updateVehicle(event: any): void {
    var id: Element = event.currentTarget.parentNode.getAttribute('id');
    this.router.navigateByUrl("/vehicles/update", { state: { id: id } });
  }

  confirmDelete(event: any): void {
    var parent: Element = event.currentTarget.parentNode;
    var idStr: string = parent.getAttribute('id') + '';
    var vehicleCode: string = parent.getAttribute('vehicle') + '';
    this.errorMessage = '';
    this.successMessage = '';

    this.confirmDialog
      .open(ConfirmDialogComponent, {
        data: parent.getAttribute('vehicle')
      })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          this.vehiclesService.postDeleteVehicle(idStr)
          .pipe(
            tap(
              (vehiclesResponse: VehicleResponse) => 
                  !vehiclesResponse || vehiclesResponse['statusCode'] == 401 ? this.errorMessage = 'Something goes wrong: ' + (vehiclesResponse['statusCode'] == 401 ? vehiclesResponse['msg'] : 'Unexpected error.') : this.successMessage = 'Vehicle ' + vehicleCode + ' deleted correctly.'
            )
          )
          .subscribe(
            (data) => this.getVehiclesList()
          );
        }
      });

      ;
    }

  onSubmit(): void {
    this.errorMessage = '';
    this.vehiclesService.postFindByFields(this.searchForm.value)
      .pipe(
        tap(
          (vehiclesResponse: Vehicle[]) => 
              !vehiclesResponse ? this.errorMessage = 'Something goes wrong.' : this.vehicles = vehiclesResponse
        )
      )
      .subscribe();
  }
  
  getVehiclesList() {  
    this.vehiclesService.postVehiclesList()
      .pipe(
        tap((vehiclesResponse: Vehicle[]) => this.vehicles = vehiclesResponse)
      )
      .subscribe();
  }

  addVehicle() {
    this.router.navigateByUrl("/vehicles/add");
  }
}
