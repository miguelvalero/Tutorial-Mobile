import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers, Response, ResponseContentType } from '@angular/http';

/**
 * Generated class for the AsignarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asignar',
  templateUrl: 'asignar.html',
})
export class AsignarPage {
  private APIUrlEquipo = 'http://147.83.118.92:3000/api/equipos/';
  private APIUrlNoAsignados= 'http://147.83.118.92:3000/api/personas?filter[where][and][0][idEquipo]=0&filter[where][and][1][rol]=alumno';
  private APIUrlAsignados= 'http://147.83.118.92:3000/api/personas?filter[where][and][1][rol]=alumno&filter[where][idEquipo]=';
  private APIUrlPut = 'http://147.83.118.92:3000/api/personas';

  idEquipo: number;
  equipo: any;
  lista: any[];
  seleccionados: boolean[];
  imagenLogo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient, private http2: Http) {
    this.idEquipo = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsignarPage');
    this.DameEquipo();
  }

  DameEquipo () {
    this.http.get<any>(this.APIUrlEquipo+this.idEquipo)
    .subscribe( equipo => {
                            this.equipo = equipo;
                            console.log ('Ya tengo el equipo');
                            console.log (this.equipo);
                            this.http2.get('http://localhost:3000/apI/imagenes/LogosEquipos/download/' + this.equipo.logo,
                            { responseType: ResponseContentType.Blob } )
                            .subscribe(response => this.CargarLogo(response));
                          }
              );
  }
  CargarLogo (response: Response)
  {

      const blob = new Blob([response.blob()], { type: 'image/jpg' });

      // La siguiente sentencia es la que necesitaríamos si quisieramos descargar la imagen en la carpeta de descargas
      // saveAs(blob, this.file.name);


      // Ahora vamos a colocar la imagen que está en blob en la etiqueta img correspondiente
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        // Pongo a la espera al reader de manera que en cuanto acabe coloca la URL donde toca para que se vea la imagen
          this.imagenLogo = reader.result.toString();
      }, false);

      // Aqui es donde ordeno que se lea la imagen y se prepare la URL
      if (blob) {
          reader.readAsDataURL(blob);
      }


  }

  DameNoAsignados () {
    console.log ('busco no asignados')
    this.http.get<any[]>(this.APIUrlNoAsignados)
    .subscribe( lista => {
                            this.lista = lista;
                            console.log ('Ya ha llegado no asignados');
                            console.log (this.lista);
                            this.seleccionados = Array(this.lista.length).fill(false);
                          }
              );
  }

  DameAsignados () {
    this.http.get<any[]>(this.APIUrlAsignados+this.equipo.id)
    .subscribe( lista => {
                            this.lista = lista;
                            console.log ('Ya ha llegado');
                            console.log (this.lista);
                            this.seleccionados = Array(this.lista.length).fill(false);
                          }
              );
  }

  VerNO () {
    this.DameNoAsignados();
  }
  VerSI () {
    console.log ('Voy a ver los miembros de este equipo');
    this.DameAsignados();
  }

  Asignar () {
    console.log ('VOY a asignar a: '+ this.idEquipo);
    console.log (this.seleccionados);
    for (var i = 0; i < this.seleccionados.length; i++) {
      if (this.seleccionados [i]) {
        this.lista[i].idEquipo = this.idEquipo;
        console.log (this.lista[i]);
        this.http.put<any>(this.APIUrlPut + '/' + this.lista[i].nombre, this.lista[i])
        .subscribe (() => this.DameNoAsignados());;
      }
    }

  }

  Capitan () {
    console.log ('VOY a asignar a ASIGNAR CAPITAN: '+ this.idEquipo);
    console.log (this.seleccionados);
    for (var i = 0; i < this.seleccionados.length; i++) {
      if (this.seleccionados [i]) {
        this.equipo.capitan = this.lista[i].nombre;
        this.http.put<any>(this.APIUrlEquipo+this.idEquipo, this.equipo)
        .subscribe (() => this.DameAsignados());;
      }
    }
  }

}
