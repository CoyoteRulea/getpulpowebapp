import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './global/components/header/header.component';
import { FooterComponent } from './global/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './global/components/confirm-dialog/confirm-dialog.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateComponent } from './pages/vehicles/update/update.component';
import { AddComponent } from './pages/vehicles/add/add.component';
import { SignupComponent } from './pages/users/signup/signup.component';
import { LoginComponent } from './pages/users/login/login.component';
import { GlobalLoggedUser } from './global/service/logged-user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VehiclesComponent,
    UpdateComponent,
    AddComponent,
    SignupComponent,
    LoginComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [ GlobalLoggedUser ],
  bootstrap: [ AppComponent ],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
