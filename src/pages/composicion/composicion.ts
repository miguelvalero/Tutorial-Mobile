import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SeleccionadosProvider } from '../../providers/seleccionados/seleccionados';


/**
 * Generated class for the ComposicionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-composicion',
  templateUrl: 'composicion.html',
})
export class ComposicionPage {

  idEquipo: number;
  lista: any[];
  equipo: any;
  private APIUrlBuscar = 'http://147.83.118.92:3000/api/personas?filter[where][idEquipo]=';
  private APIUrlEquipo = 'http://147.83.118.92:3000/api/equipos/';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient,private proveedor : SeleccionadosProvider) {

    this.idEquipo = navParams.get('id');
    console.log ('CONSTRUCTOR mostrar: ' + this.idEquipo);
  }

  ionViewDidLoad() {
    this.DameEquipo();

  }
  DameAlumnos () {
    this.http.get<any[]>(this.APIUrlBuscar+this.idEquipo)
    .subscribe( lista => {
                            this.lista = lista;
                            console.log ('Ya ha llegado');
                            console.log (this.lista);
                          }
              );
  }

  DameEquipo () {
    this.http.get<any>(this.APIUrlEquipo+this.idEquipo)
    .subscribe( equipo => {
                            this.equipo = equipo;
                            console.log ('Ya tengo el equipo');
                            console.log (this.equipo);
                            this.DameAlumnos();
                          }
              );
  }

  Seleccionar (alumno: any) {
    this.proveedor.nuevoSeleccionado(alumno);
  }
}
