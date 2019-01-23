import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the VerEquiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-equipos',
  templateUrl: 'ver-equipos.html',
})
export class VerEquiposPage {
  private APIUrlEquipos = 'http://147.83.118.92:3000/api/equipos';
  listaEquipos: any[];
  puntos: number[]=[];
  cont: number =0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient) {
  }

  ionViewDidLoad() {
    this.DameEquipos();
  }

  DameEquipos () {
    this.http.get<any[]>(this.APIUrlEquipos)
    .subscribe( lista => {
                            this.listaEquipos = lista;
                            console.log ('Ya ha llegado');
                            console.log (this.listaEquipos);
                            this.puntos = Array(this.listaEquipos.length).fill(0);
                            this.CalcularPuntos();
                          }
              );
  }

  CalcularPuntos () {
    for (var i=0; i< this.listaEquipos.length; i++)
    {
      console.log ('Busco equipo '+i);
      let URL = this.APIUrlEquipos+"/"+this.listaEquipos[i].id+"/personas?filter[fields][puntos]=true";
      this.http.get<any[]>(URL)
      .subscribe( lista => {
                              console.log ('ya esta aqui');
                              console.log (lista);

                              this.puntos[this.cont++]=this.Sumar(lista);
                              console.log ('Mas ');
                              console.log (this.puntos);
                            });

    }

  }

  Sumar (lista: any[]): number {
    let total = 0;
    for (var i=0; i< lista.length; i++)
      total= total + lista[i].puntos;
    return total;
  }


}
