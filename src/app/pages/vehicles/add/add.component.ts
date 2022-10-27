import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { Brand } from '../../brands/interfaces/brands.interface';
import { BrandsService } from '../../brands/service/brands.service';
import { Color } from '../../colors/interfaces/colors.interface';
import { ColorsService } from '../../colors/service/colors.service';
import { Vehicle, VehicleResponse } from '../interfaces/vehicles.interface';
import { VehiclesService } from '../service/vehicles.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  id!: string;
  vehicles!: Vehicle[];
  errorMessage!: string;
  successMessage!: string;
  
  colorList!: Color[];
  brandList!: Brand[];
  
  addForm = new FormGroup({
    _id:        new FormControl(''),
    vehicle_id: new FormControl(''),
    brand:      new FormControl(''),
    model:      new FormControl(''),
    color:      new FormControl(''),
    status:     new FormControl(''),
    assigned:   new FormControl('')
  });

  constructor(private vehiclesService: VehiclesService, private router: Router, private colorsService: ColorsService, private brandsService: BrandsService) {
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
  }

  goBack() {
    this.router.navigateByUrl("/vehicles");
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.vehiclesService.postAddVehicle(this.addForm.value)
      .pipe(
        tap(
          (vehiclesResponse: VehicleResponse) => 
            !vehiclesResponse || vehiclesResponse['statusCode'] == 409 ? 
              this.errorMessage = 
                'Something goes wrong: ' + (vehiclesResponse['statusCode'] == 409 ? vehiclesResponse['msg'] : 'Unexpected error.') : 
                this.successMessage = 'Vehicle ' + vehiclesResponse['vehicle'].vehicle_id + ' added correctly.'
        )
      )
      .subscribe();
  }

}
