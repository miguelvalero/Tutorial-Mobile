import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ProfesorPage } from '../profesor/profesor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nombre: string;
  pass: string;
    private APIUrl = 'http://147.83.118.92:3000/api/personas'


  constructor(  public navCtrl: NavController,
                public alertCtrl: AlertController,
                private http: HttpClient) {

  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  Autentificar () {
    this.http.get<any>(this.APIUrl + '/' + this.nombre)
    .subscribe (persona => {

                              if ((persona != null)&& (persona.pass === this.pass)) {
                                if (persona.rol === 'Profesor') {
                                    this.navCtrl.push (ProfesorPage);
                                } else {
                                  console.log ('hola alumno')
                                }


                              }  else {
                                console.log ("Error de autentificación");
                                this.showAlert('Error de autentificación');
                              }

                            }
                );

  }
}
