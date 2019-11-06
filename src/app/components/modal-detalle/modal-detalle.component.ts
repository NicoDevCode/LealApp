import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HomeComponent} from '../home/home.component';
/**Componente de ModalDetalleComponent*/
@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.css']
})
export class ModalDetalleComponent implements OnInit {
  /**
   Variable que guarda la data de la transaccion compartida desde HomeComponent**/
  data_detalle: any;
  /**
   Constructor del componente que recibe los servicios importados**/
  constructor(/**
               Permite que pueda ejecutar el modal desde el HomeComponent**/
              public dialogRef: MatDialogRef<HomeComponent>,
              /**
               Metodo que me permite ejecutar el modal y compartir mediante este la data **/
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  /**
   Se ejecuta al iniciar el componente y recupera los datos de la transaccion seleccionada **/
  ngOnInit() {
    this.data_detalle  = this.data['data'];
  }
  /**
   Funcion que cierra el modal con el detalle de la transaccion seleccionada**/
  onNoClick(): void {
    this.dialogRef.close();
  }

}
