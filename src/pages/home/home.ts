import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nombre: string;
  pass: string;

  constructor(public navCtrl: NavController) {

  }

  Autentificar () {
    console.log ('Autentificando a ' + this.nombre);
  }

  Saludar () {
    console.log ('Hola');
  }
}
