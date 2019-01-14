import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ProfesorPage } from '../profesor/profesor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nombre: string;
  pass: string;
  private APIUrl = 'http://127.0.0.1:3000/personas'

  constructor(public navCtrl: NavController,
    private http: HttpClient) {

  }

  Autentificar () {
    this.http.get<any>(this.APIUrl + '/' + this.nombre)
    .subscribe (persona => {
                              if (persona != null) {
                                if (persona.rol === 'Profesor') {
                                    this.navCtrl.push (ProfesorPage);
                                } else {
                                  console.log ('hola alumno')
                                }
                              }

                            }
                );

  }
}
