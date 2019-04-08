import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AsignaturasMatriculadasPage } from '../asignaturas-matriculadas/asignaturas-matriculadas';

/**
 * Generated class for the MatriculadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matriculados',
  templateUrl: 'matriculados.html',
})
export class MatriculadosPage {

  asignatura: any;
  lista: any[];
  private APIUrl = 'http://localhost:3000/api/matriculas?filter[where][idAsignatura]=';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.asignatura = navParams.get('asig');
  }

  ionViewDidLoad() {
    console.log('Voy a mostrar matriculados en '+ this.asignatura.nombre);
    this.MostrarMatriculados();
  }
  MostrarMatriculados () {
    this.http.get<any[]>(this.APIUrl+this.asignatura.id)
    .subscribe( lista => {
                            this.lista = lista;
                            console.log ('Ya ha llegado');
                            console.log (this.lista)
                          }
              );
  }

  MostrarAsignaturas (alumno: any) {
    this.navCtrl.push(AsignaturasMatriculadasPage, {alum : alumno });
  }

}
