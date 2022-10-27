import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/internal/operators/tap';
import { Vehicle, VehicleResponse } from '../interfaces/vehicles.interface';
import { VehiclesService } from '../service/vehicles.service';
import { Router } from '@angular/router';
import { BrandsService } from '../../brands/service/brands.service';
import { ColorsService } from '../../colors/service/colors.service';
import { Color } from '../../colors/interfaces/colors.interface';
import { Brand } from '../../brands/interfaces/brands.interface';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  id!: string;
  vehicles!: Vehicle[];
  errorMessage!: string;
  successMessage!: string;
  
  colorList!: Color[];
  brandList!: Brand[];
  
  updateForm = new FormGroup({
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
    // Check id from call if currently isn's assigned on form
    this.id = history.state.id;
      
    // If isn't previously asisgned and isn't in state id go to vehicles
    if (!this.id) {
      this.router.navigateByUrl("/vehicles");
      return;
    }

    this.errorMessage = '';

    this.vehiclesService.postFindByFields({ '_id': this.id })
    .pipe(
      tap(
        (vehiclesResponse: Vehicle[]) => 
            !vehiclesResponse ? this.errorMessage = 'Something goes wrong.' : this.vehicles = vehiclesResponse
      )
    )
    .subscribe(
      (data) => {
        if (this.errorMessage == '') {
          if (this.vehicles) {
            this.updateForm.setValue({
              _id: this.id,
              vehicle_id:this.vehicles[0].vehicle_id,
              brand: this.vehicles[0].brand,
              model: this.vehicles[0].model,
              color: this.vehicles[0].color,
              status: String(this.vehicles[0].status),
              assigned: String(this.vehicles[0].assigned),
            });
          } else {
            this.goBack();
          }
        }
      }
    );   
  }

  goBack() {
    this.router.navigateByUrl("/vehicles");
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.vehiclesService.postUpdateVehicle(this.updateForm.value)
      .pipe(
        tap(
          (vehiclesResponse: VehicleResponse) => 
              !vehiclesResponse ? this.errorMessage = 'Something goes wrong.' : this.successMessage = 'Vehicle correctly updated'
        )
      )
      .subscribe();
  }

}
