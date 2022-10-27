import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsRoutingModule } from './colors-routing.module';
import { ColorsComponent } from './colors.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ColorsComponent
  ],
  imports: [
    CommonModule,
    ColorsRoutingModule,
    FormsModule
  ]
})
export class ColorsModule { }
