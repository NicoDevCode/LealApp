import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {getHeaders} from '../../utils/sharedHeaders';
import {environment} from '../../../../environments/environment';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {UserInterface} from '../../../models/user.interface';
/**Componente de SessionService*/
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  /**Endpoint a el que apunta el servico para obtener los datos del usuario y devolver el token de session*/
  private LOGIN_URL = `${environment.http_server}/api/user/login`;
  /**Endpoint a el que apunta el servico para eliminar el token de session y desloguear al usuario de la app*/
  private LOGOUT_URL = `${environment.http_server}/auth/logout/`;
  /**Recibo en el contructor la propiedad HttpClient importada para poder hacer un servicio por http**/
  constructor(private  http: HttpClient) {
  }
  /**Servicio al que accedo para obtener datos de el usuario y
   * poder proceder al inicio de session una ves me devuelva el token de session**/
  loginuser(email: string, password: string): Observable<any> {
    return this.http
      .post<UserInterface>(this.LOGIN_URL, {email, password});
  }

  /**Paso los datos de el usuario obtenidos del servicio a localStorage**/
  setUser(user: UserInterface): void {
    const user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }
  /**Paso el token de session de el usuario obtenido del serivio a localStorage**/
  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }
  /**valido que el usuario tiene datos y los retorno**/
  getCurrentUser(): UserInterface {
    const user_string = localStorage.getItem('currentUser');
    if (isNotNullOrUndefined(user_string)) {
      const user: UserInterface = JSON.parse(user_string);
      return user;

    } else {
      return null;
    }
  }
  /**Servicio que me cierra la session de el usuario y me elimina el token
   * de session y datos del usuario del localStorage*/
  logoutUser(): Observable<any> {
    return this.http.post(this.LOGOUT_URL, null, getHeaders());
  }
}
