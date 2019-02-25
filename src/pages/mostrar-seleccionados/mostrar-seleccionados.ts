import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MostrarSeleccionadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostrar-seleccionados',
  templateUrl: 'mostrar-seleccionados.html',
})
export class MostrarSeleccionadosPage {


  lista: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lista = navParams.get('lista');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MostrarSeleccionadosPage');
  }

}
