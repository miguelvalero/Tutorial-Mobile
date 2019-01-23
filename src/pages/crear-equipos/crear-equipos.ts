import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AsignarPage} from '../asignar/asignar';

/**
 * Generated class for the CrearEquiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-equipos',
  templateUrl: 'crear-equipos.html',
})
export class CrearEquiposPage {
  private APIUrl = 'http://147.83.118.92:3000/api/equipos';
  listaEquipos: any[];
  nombre: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearEquiposPage');
    this.DameEquipos();
  }
  ionViewWillEnter() {
    console.log ('vuelvo a ionviewWillEnter');
    this.DameEquipos();
  }

  DameEquipos () {
    this.http.get<any[]>(this.APIUrl)
    .subscribe( lista => {
                            this.listaEquipos = lista;
                            console.log ('Ya ha llegado');
                            console.log (this.listaEquipos);
                          }
              );
  }

  CrearEquipo () {
    let equipo = { nombre: this.nombre };
    this.http.post<any>(this.APIUrl, equipo).subscribe (() => this.DameEquipos()
    )
  }

  Asignar (equipo : any) {
    this.navCtrl.push (AsignarPage,{id : equipo.id });
  }
}
