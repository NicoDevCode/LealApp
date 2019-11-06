import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SessionService} from '../components/session/services/session.service';
/**
 * En este Archivo maneja el rol de usuarios
 * en este caso manejo de login y permiso
 * de acceso a componentes por medio
 * del metodo canActivate()**/
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   Se hace uso de los servicios realizados en el archivo session.service.ts
   para validar que hay un usuario logueado y se utiliza Router para redirigir
   en caso de que se cumpla ciertas acciones especificas por ejemplo
   si el usuario no esta logueado redigirlo a el componente de loging **/
  constructor(private service: SessionService, private router: Router) {
  }
  /**
   Metodo en el cual se define la Accion de habilitar ciertas rutas dependiendo lo que retorne**/
  canActivate() {
    if (this.service.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
