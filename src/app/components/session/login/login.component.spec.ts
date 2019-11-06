import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {SessionService} from '../services/session.service';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {SnotifyService, ToastDefaults} from 'ng-snotify';
import {of} from 'rxjs';
import {AppRoutingModule} from '../../../app-routing.module';
import {HomeComponent} from '../../home/home.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
      declarations: [LoginComponent, HomeComponent],
      providers: [SessionService,
        {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
        SnotifyService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('When onLogin() is called', () => {
    it('all should be fine', () => {
      const users: any = [];
      spyOn(component.service, 'loginuser').and.returnValue(of({users}));
      component.testServiceLogin();
      expect(component.error).toBeFalsy();
      expect(component.users).toEqual({users});
    });
  });
});
