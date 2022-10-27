import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { VehiclesComponent } from './vehicles.component';

const routes: Routes = [
                  { path: '', component: VehiclesComponent },
                  { path: 'add', component: AddComponent },
                  { path: 'update', component: UpdateComponent }
                ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
