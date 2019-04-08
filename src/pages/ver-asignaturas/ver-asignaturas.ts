import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MatriculadosPage } from '../matriculados/matriculados';


/**
 * Generated class for the VerAsignaturasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-asignaturas',
  templateUrl: 'ver-asignaturas.html',
})
export class VerAsignaturasPage {
  private APIUrl = 'http://localhost:3000/api/asignaturas';


  lista: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerAsignaturasPage');
    this.DameAsignaturas();
  }
  DameAsignaturas() {
    this.http.get<any[]>(this.APIUrl)
    .subscribe( lista => {
                            this.lista = lista;
                            console.log ('Ya ha llegado');
                            console.log (this.lista)
                          }
              );
  }

  MostrarMatriculados (asignatura: any) {
    console.log ('Voy a mostrar matriculados en '+ asignatura.nombre);
    this.navCtrl.push(MatriculadosPage, {asig : asignatura });
  }

}
