import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) }, { path: 'vehicles', loadChildren: () => import('./pages/vehicles/vehicles.module').then(m => m.VehiclesModule) }, { path: 'brands', loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule) }, { path: 'colors', loadChildren: () => import('./pages/colors/colors.module').then(m => m.ColorsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
