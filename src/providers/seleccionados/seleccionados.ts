import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/*
  Generated class for the SeleccionadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeleccionadosProvider {

  seleccionados = new Subject();

  constructor(public http: HttpClient) {
    console.log('Hello SeleccionadosProvider Provider');
  }

  nuevoSeleccionado (alumno : any) {
    this.seleccionados.next (alumno);

  }

}
