import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ComposicionPage } from '../composicion/composicion';
import { SeleccionadosProvider } from '../../providers/seleccionados/seleccionados';

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
  alumnosSeleccionados: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient, private proveedor : SeleccionadosProvider) {
  }

  ionViewDidLoad() {
    this.DameEquipos();
    this.alumnosSeleccionados= [];
    this.proveedor.seleccionados
    .subscribe ( alumno => this.alumnosSeleccionados.push(alumno));

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
      let URL = this.APIUrlEquipos+"/"+this.listaEquipos[i].id+"/personas?filter[fields][puntos]=true&filter[fields][idEquipo]=true";
      this.http.get<any[]>(URL)
      .subscribe( lista => {
                              console.log ('ya esta aqui');
                              console.log (lista);
                              if (lista.length >0) {
                                let pos = lista[0].idEquipo;
                                this.puntos[pos-1]=this.Sumar(lista);
                                console.log ('Mas ');
                                console.log (this.puntos);
                              }
                            });

    }

  }

  Sumar (lista: any[]): number {
    let total = 0;
    for (var i=0; i< lista.length; i++)
      total= total + lista[i].puntos;
    return total;
  }

  Mostrar (equipo: any) {
    console.log ('Vamos a mostrar a '+equipo.id);
    this.navCtrl.push(ComposicionPage, {id : equipo.id });

  }


}
