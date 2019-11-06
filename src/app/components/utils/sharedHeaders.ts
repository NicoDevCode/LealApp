import {HttpHeaders, HttpParams} from '@angular/common/http';
/**
 Funciones que manejan el token del usuario obtenido de localStorage
 y permitir con este hacer las correspondientes request que necesitan de Token Authorization**/
export function getHeaders() {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    })
  };
}

