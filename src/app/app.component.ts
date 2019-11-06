import {Component, ElementRef, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {SessionService} from './components/session/services/session.service';
/**Componente de AppComponent*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**Titulo de la App**/
  title = 'Leal-App';
  /**Variable booleana que setea el estado de getCurrentUser
   * y habilita si este devuelve true**/
  isLogged = false;
  /**
   Constructor del componente que recibe los servicios importados**/
  constructor(private spinnerService: NgxSpinnerService, private service: SessionService) {
  }
  /**
   Se ejecuta al iniciar el componente y ejecuta una funcion
   para un spinner al cargar el componente**/
  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
    this.onCheckUser();
  }

  /**Valida que hay un usuario logueado y me habilita el navbar**/
  onCheckUser() {
    this.isLogged = this.service.getCurrentUser() != null;
  }
}
