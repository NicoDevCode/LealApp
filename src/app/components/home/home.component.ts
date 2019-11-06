import {Component, ElementRef, OnInit} from '@angular/core';
import {HomeServicesService} from './service/home-services.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalDetalleComponent} from '../modal-detalle/modal-detalle.component';
import {SnotifyPosition, SnotifyService} from 'ng-snotify';
/**
 * Componente HomeComponent**/
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  /**
   * Variable que maneja el delay para mostrar los datos**/
  loading = false;
  /**
   * Variable par las unit test en caso de un erro**/
  error = false;
  /**
   * Variable par las unit test para comparar el servicio**/
  history: any;
  /**
   * Variable en la cual se guardan la data una ves echa la request en getDataHistory()**/
  data_user: any = [];
  /**
   * Variable la cual guarda los datos obtenido de cada input perteneciente al filtro**/
  filter = {};
  /**
   * Variable la cual guarda el dato obtenido por el [(ngModel)]="max_date" **/
  max_date = null;
  /**
   * Variable la cual guarda el dato obtenido por el [(ngModel)]="min_date" **/
  min_date = null;
  /**
   * Variable la cual guarda el dato obtenido por el [(ngModel)]="filterPoint" **/
  filterPoint = null;
  /**
   * Variable la cual guarda el dato obtenido por el [(ngModel)]="filtervalue" **/
  filtervalue = null;
  /**
   * Variable la cual guarda el dato obtenido por el [(ngModel)]="filterType" **/
  filterType = null;
  /**
   * Variable la cual guarda y comparte los datos especificos del detalle de la transaccion seleccionada **/
  data_detalle: any;
  /**
   * Variable la cual guarda una copia de los datos obtenidos por la request en getDataHistory() **/
  data_user_copy = null;
  /**
   * propiedades que tiene el objeto ajenas al filtro**/
  delete_properties = ['createdDate', 'date', 'time', 'userId', '_id'];
  /**
   Variable que almacena una copia de los datos optenidos por la request de  getDataHistory()**/
  data_api = null;
  /**
   definicion de servicios utilozados en este componente desde el constructor**/
  constructor(private elementRef: ElementRef,
              /**
               Resivo en el constructor del componente los servicios creados en home-services.service**/
              public service: HomeServicesService,
              /**
               * Recibo serivicio de MatDialog para ejecutar un modal en el componente
               **/
              public dialog: MatDialog,
              /**
               Recibo serivicio de SnotifyService para la notificacion de alert**/
              private snotifyService: SnotifyService) {
  }
  /**
   * Funcion que al iniciar el componente ejecuta
   * una funcion this.ngAfterViewIni(); que me obtiene mediante un servicio
   * el historial de transacciones de un ussuario y la otra funcion this.getDataHistory();
   * funcion que me agrega algunos estilos especialmente a este componente**/

  ngOnInit() {
    this.ngAfterViewIni();
    this.getDataHistory();
  }
  /**
   * funcion que me agrega algunos estilos especialmente a este componente**/
  ngAfterViewIni() {
    this.elementRef.nativeElement.ownerDocument.body.style.background = '#f2f4f4';
  }
  /**
   funcion que me obtiene mediante un servicio
   * el historial de transacciones de un usuario**/
  getDataHistory() {
    this.loading = true;
    this.service.listHistory().subscribe(
      data => {
        this.history = data;
        this.error = false;
        this.data_user = this.service.parseResponse(data.data);
        /**Se crea una copia de los datos obtenidos de la api para tratarlos mas adelante**/
        this.data_api = this.data_user.slice();
        /**
         * Funcion que maneja el tiempo de el delay de las lista de los datos**/
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    );
  }
  /**
   * Funcion que se ejecuta desde el boton Filtrar
   * la cual tiene como funcion la cadena por los
   * terminos o criterios de busquedas**/
  filterDate() {
    this.loading = true;
    this.error = false;
    /**
     * Se arma un array donde se guardan los criterios de busqueda solicitado desde el dom**/
    const search_term = {
      points: this.filterPoint,
      value: this.filtervalue,
      type: this.filterType
    };
    /**
     * En este condicional se valida si los campos de fecha estan vacios**/
    if (this.max_date && this.min_date) {
      /**Se pasan como parametros el mes min de busqueda y el mes maximo
       * para poder hacer la request que me filtrara los datos con esos criterios**/
      this.service.filterByDateRange(`startDate=${this.min_date}&endDate=${this.max_date}`).subscribe(
        data => {
          /**Se le asigna la data obtenida del servicio a this.data_api **/
          this.data_api = this.service.parseResponse(data.data);
          /**Se ejecuta la funcion this.completeSearch la cual se le pasa
           * por parametros los datos con los criterios de busqueda
           * en el array que se lleno al principio de la ejecucion de esta funcion**/
          this.completeSearch(search_term);
          /**
           * Funcion que maneja el tiempo de el delay de las lista de los datos**/
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    } else {
      /**
       * En este condicional se valida en caso que los campos de el array search_term esten nulos**/
      if (this.filterPoint !== null || this.filtervalue !== null || this.filterType !== null) {
        /**Se ejecuta la funcion this.completeSearch la cual se le pasa
         * por parametros los datos con los criterios de busqueda
         * en el array que se lleno al principio de la ejecucion de esta funcion**/
        this.completeSearch(search_term);
        /**
         * Funcion que maneja el tiempo de el delay de las lista de los datos**/
        setTimeout(() => {
          this.loading = false;
        }, 500);
      } else {
        /**
         * Funcion que maneja el tiempo de el delay de las lista de los datos**/
        setTimeout(() => {
          this.loading = false;
        }, 500);
        /**
         *Si los campos de el filtrado por puntos, valor y tipo estan vacios
         * y los de fecha tambien manda un alerta de error**/
        this.snotifyService.error('Ambos campos de fecha deben estar llenos', 'Error', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          position: SnotifyPosition.rightTop
        });
      }
    }
  }
  /**
   funcion que limpia los inputs por los cuales puedo filtrar trasacciones
   del usuario mediante instrucciones especificas y esta se ejecuta desde el boton Limpiar**/
  clean_inputs() {
    this.min_date = null;
    this.max_date = null;
    this.filterPoint = null;
    this.filterType = null;
    this.filtervalue = null;
    this.data_user = this.data_api.slice();
    this.getDataHistory();
  }
  /**
   Funcion que al ejecutarce despliega un modal con mas detalles de la transaccion seleccionada**/
  openDialog(detalle_user): void {
    this.data_detalle = detalle_user;
    const dialogRef = this.dialog.open(ModalDetalleComponent, {
      data: {
        data: this.data_detalle
      }
    });
  }
  /**Funcion la cual se ejecuta desde la funcion filterDate() para validar y
   * mostrar datos los datos especificos del criterio de busqueda**/
  completeSearch(terms) {
    /**Variable que almacena un clon limpio
     * de los datos obtenido por la request que
     * obtiene las transaccion history y excluye los
     * termino del filtro que no fueron requeridos*/
    const temp_data = this.data_api.slice();
    /**
     * terms_copy es una copia de los terminos de busqueda la cual pasa
     * como paratmetro los datos que obtubieron de search_term y ejecuta una funcion en home-services.service*/
    const terms_copy = this.service.cleanFilter(
      /**
       * Convierte los datos del filtro ya limpios con los terminos de
       * busqueda requeridos por el usuario en string para al final poder hacer una comparacion de datos
       * y filtrar los especificos*/
      this.service.cloneObject(terms)
    );
    /**Retorna la lista filtrada final por criterios de busquedas*/
    this.data_user = temp_data.filter((transaction) => {
      /**se arma un array con todos los datos excluidos por el filtro y 'Datos del fitro en null'*/
      const properties = this.delete_properties.concat(terms_copy['empty_props']);
      /**filter_copy guarda los datos requeridos para realizar el criterio de busqueda*/
      const filter_copy = terms_copy['filter'];
      /**transaction_copy me trae todos los datos por clave y valor del criterio de busqueda del filtro*/
      const transaction_copy = this.service.cleanProperties(
        transaction,
        properties
      );
      /**Comparo por clave y valor de los datos listados con los datos por los cuales se quieren filtrar*/
      return this.service.compare(transaction_copy, filter_copy);
    });
  }
}

