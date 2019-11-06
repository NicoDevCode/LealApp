import { Component, OnInit } from '@angular/core';
import {SessionService} from '../session/services/session.service';
import {UserInterface} from '../../models/user.interface';
import {Router} from '@angular/router';
/**Componente de NavbarComponent*/
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  /**
   Constructor del componente que recibe los servicios importados**/
  constructor(private service: SessionService,
              private router: Router) { }
  /**
   Variable que almacena los datos del usuario **/
  user: UserInterface;
  /**
   Se ejecuta al iniciar el componente y recupera los datos del usuario**/
  ngOnInit() {
    this.user = this.service.getCurrentUser();
  }
  /**
   Funcion que limpia los datos almacenados en localStorage para mantener la session**/
  cleangLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    location.reload();
  }

  /**
   Servicio que elimina del backend el token del la session en este caso no tengo
   el endpoint con esta funcion pero puede ser utilizada a futuro**/
  onLogout() {
    this.service.logoutUser().subscribe(
      data => {
        this.cleangLocalStorage();
        this.router.navigate(['login']);
      },
      error => {
        this.cleangLocalStorage();
      }
    );
  }

}
