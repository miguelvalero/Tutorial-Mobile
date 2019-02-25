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
  private APIUrl = 'http://147.83.118.92:3000/api/personas'


  constructor(public navCtrl: NavController,
    private http: HttpClient) {
  }
}
