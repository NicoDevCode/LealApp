import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {HomeServicesService} from './service/home-services.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {
  MatCheckboxModule,
  MatTooltipModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule, MatDialogModule
} from '@angular/material';

import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from '../session/login/login.component';
import {SnotifyService, ToastDefaults} from 'ng-snotify';
import {of} from 'rxjs';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        HttpClientModule,
        FormsModule,
        MatTooltipModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ],
      declarations: [ HomeComponent,
                      LoginComponent],
      providers: [HomeServicesService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
        SnotifyService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When getDataHistory() is called', () => {
    it('all should be fine', () => {
      const history: any = [];
      spyOn(component.service, 'listHistory').and.returnValue(of({ history }));
      component.getDataHistory();
      expect(component.error).toBeFalsy();
      expect(component.history).toEqual({ history });
    });
  });

  describe('When filterDate() is called', () => {
    it('all should be fine', () => {
      component.filterDate();
      expect(component.error).toBeFalsy();
    });
  });

});
