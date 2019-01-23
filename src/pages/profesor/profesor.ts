import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profesor',
  templateUrl: 'profesor.html',
})
export class ProfesorPage {
  private APIUrl = 'http://147.83.118.92:3000/api/personas?filter[where][rol]=Alumno';


  lista: any[];
  seleccionados: boolean[];
  todos: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient) {
  }

  ionViewDidLoad() {
    this.DameAlumnos();
  }

  DameAlumnos () {
    this.http.get<any[]>(this.APIUrl)
    .subscribe( lista => {
                            this.lista = lista;
                            console.log ('Ya ha llegado');
                            console.log (this.lista);
                            this.seleccionados = Array(this.lista.length).fill(false);
                          }
              );
  }

  Incrementar () {
    console.log ('voy a incrementar los puntos de: ');
    console.log (this.seleccionados);
    for (var i = 0; i < this.seleccionados.length; i++) {
      if (this.seleccionados [i]) {
        this.lista[i].puntos++;
        this.http.put<any>(this.APIUrl + '/' + this.lista[i].nombre, this.lista[i])
        .subscribe (() => this.DameAlumnos());;
      }
    }
  }


}
