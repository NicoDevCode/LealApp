import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatCheckboxModule,
  MatTooltipModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/session/login/login.component';
import {SessionService} from './components/session/services/session.service';
import { FormsModule } from '@angular/forms';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HomeServicesService} from './components/home/service/home-services.service';
import { ModalDetalleComponent } from './components/modal-detalle/modal-detalle.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FilterPipe } from './components/pipes/filter.pipe';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ModalDetalleComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    SnotifyModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [SessionService, HomeServicesService,
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  entryComponents: [
    ModalDetalleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
