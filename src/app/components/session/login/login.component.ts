import {Component, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {SessionService} from '../services/session.service';
import {UserInterface} from '../../../models/user.interface';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {SnotifyService, SnotifyPosition} from 'ng-snotify';

/**Componente de LoginComponent*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  /**
   * Variable par las unit test en caso de un erro**/
  error = false;
  /**
   * Variable par las unit test para comparar el servicio**/
  users: any;

  /**
   Contructor del componente que recibe los servicios importados**/
  constructor(public service: SessionService,
              private elementRef: ElementRef,
              private router: Router,
              private location: Location,
              private snotifyService: SnotifyService) {
  }

  /**Recojo los datos que necesito para loguear al usuario y pasarcelos al servicio para validarlos*/
  user: UserInterface = {
    email: '',
    password: ''
  };

  /**
   Se ejecuta al iniciar el componente**/
  ngOnInit() {
    /**Metodo que asigna estilos especiales al componente una ves este se inicie*/
    document.body.className = 'selector';
  }

  /**esta funcion pasa los datos del el usuario y el token a
   * localStorage en median la funcion setUser() y setToken() en SessionService*/
  sendLocalStorage(data) {
    this.service.setUser(data.user);
    this.service.setToken(data.token);
  }

  /**Servicio para hacer el test de loging*/
  testServiceLogin() {
    this.service
      .loginuser(this.user.email, this.user.password)
      .subscribe(
        data => {
          this.users = data;
          this.error = false;
        }
      );
  }

  /**Funcion que ejecuta el servicio de login para validar
   * que el usuario puede acceder a nuestra app*/
  onLogin() {
    this.service
      .loginuser(this.user.email, this.user.password)
      .subscribe(
        data => {
          this.sendLocalStorage(data);
          this.location.replaceState('/');
          location.reload();
          this.testServiceLogin();
        },
        (error => {
          console.log(error['error']);
          this.snotifyService.error('Credenciales incorrectas', 'Error', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            position: SnotifyPosition.rightTop
          });
        })
      );
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}
