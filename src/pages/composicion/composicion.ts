import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SeleccionadosProvider } from '../../providers/seleccionados/seleccionados';
import { Http, RequestOptions, Headers, Response, ResponseContentType } from '@angular/http';


/**
 * Generated class for the ComposicionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-composicion',
  templateUrl: 'composicion.html',
})
export class ComposicionPage {

  idEquipo: number;
  lista: any[];
  equipo: any;

  imagenLogo: string;

  private APIUrlBuscar = 'http://147.83.118.92:3000/api/personas?filter[where][idEquipo]=';
  private APIUrlEquipo = 'http://147.83.118.92:3000/api/equipos/';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient, private http2: Http, private proveedor : SeleccionadosProvider) {

    this.idEquipo = navParams.get('id');
    console.log ('CONSTRUCTOR mostrar: ' + this.idEquipo);
  }

  ionViewDidLoad() {
    this.DameEquipo();

  }
  DameAlumnos () {
    this.http.get<any[]>(this.APIUrlBuscar+this.idEquipo)
    .subscribe( lista => {
                            this.lista = lista;
                            console.log ('Ya ha llegado');
                            console.log (this.lista);
                          }
              );
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
                            this.DameAlumnos();
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

  Seleccionar (alumno: any) {
    this.proveedor.nuevoSeleccionado(alumno);
  }
}
