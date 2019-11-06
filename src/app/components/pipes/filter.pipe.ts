import {Pipe, PipeTransform} from '@angular/core';
/**
 * Componente FilterPipe**/
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /**
   * Principalmente pense que hacer el filtro por un pipe pero opte por mi logica en el componente**/
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) {  return value; }
    const rultadohistory = [];
    for (const history of value) {
      if (history.type.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        rultadohistory.push(history);
      }
    }
    return rultadohistory;
  }

}
