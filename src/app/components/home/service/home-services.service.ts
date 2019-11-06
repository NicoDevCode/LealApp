import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {getHeaders} from '../../utils/sharedHeaders';
/**Componente de HomeServicesService*/
@Injectable({
  providedIn: 'root'
})
export class HomeServicesService {
  loading = false;
  /**Endpoint a el que apunta el servico para obtener los datos filtrados por rango de fecha**/
  private FILTER_RANGE = `${environment.http_server}/api/user/my/transactions`;
  /**Endpoint a el que apunta el servicio para obtener la lista de historial de transaccion**/
  private HISTORY = `${environment.http_server}/api/user/my/transactions`;
  /**Recibo en el constructor la propiedad HttpClient importada para poder hacer un servicio por http**/
  constructor(private  http: HttpClient) {
  }
  /**Servicio que obtiene el historial de transacciones**/
  listHistory(): Observable<any> {
    return this.http.get(this.HISTORY, getHeaders());
  }
  /**Servicio que obtiene el historial de transacciones por rango de fecha**/
  filterByDateRange(searchTerm: string): Observable<any> {
    return this.http.get(`${this.FILTER_RANGE}?${searchTerm}`, getHeaders());
  }
  /**
   * En esta funcion le doy formato o humanizo a el
   * atrivuto createdDate y agrego date y date a el
   * array humanizados**/
  parseResponse(response) {
    for (const item of response) {
      const local_date = new Date(item['createdDate']);
      item['date'] = local_date.toDateString();
      item['time'] = local_date.toLocaleTimeString();
    }
    return response;
  }
  /**
   * Limpio las propiedades que estan en nulas
   * desde el filtro y retorno las que tienen termino
   * un termino de busqueda**/
  cleanProperties(transaction, properties) {
    let trans = this.cloneObject(transaction);
    for (const prop of properties) {
      delete trans[prop];
    }
    return trans;
  }
  /**
   * Limpio las propiedades de terms_copy que estan en null
   * para tener un criterio de busqueda mas limpio y poderlo comparar**/
  cleanFilter(data) {
    let new_filter = {};
    let properties_to_del = [];
    for (const prop in data) {
      if (!data[prop]) {
        delete data[prop];
        properties_to_del.push(prop);
      } else {
        new_filter[prop] = data[prop];
      }
    }
    return {
      /**Retorno en nuevo array con los datos que quiero filtrar**/
      filter: new_filter,
      /**Retorno en nuevo array con los datos que estan en null y proceder a eliminarlos eliminarlos**/
      empty_props: properties_to_del
    };
  }

  /**Hago una copia del array con los terminos y los parseo a string el array de teminos de busqueda**/
  cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  /**Parseo a string el array de mi array a comparar**/
  getPureObject(obj) {
    return JSON.stringify(obj);
  }
  /**Funcion que compara las cadenas de filtro con mi data y encontrar el semejante**/
  compare(transaction, filter) {
    return this.getPureObject(transaction) === this.getPureObject(filter);
  }
}
