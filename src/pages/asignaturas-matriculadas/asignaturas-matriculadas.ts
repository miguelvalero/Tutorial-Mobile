import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the AsignaturasMatriculadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asignaturas-matriculadas',
  templateUrl: 'asignaturas-matriculadas.html',
})
export class AsignaturasMatriculadasPage {

  alumno: any;
  lista: any[];
  private APIUrl = 'http://localhost:3000/api/matriculas?filter[include][asignatura]&filter[where][idAlumno]=';
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.alumno = navParams.get('alum');
  }

  ionViewDidLoad() {
    console.log('Asignaturas matriculadas por '+ this.alumno.idAlumno);
    this.MostrarAsignaturas();
  }

  MostrarAsignaturas () {
    this.http.get<any[]>(this.APIUrl+this.alumno.idAlumno)
    .subscribe( lista => {
                            this.lista = lista;
                            console.log ('Ya ha llegado');
                            console.log (this.lista)
                          }
              );
  }
}
