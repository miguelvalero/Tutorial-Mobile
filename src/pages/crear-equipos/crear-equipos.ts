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

  file: File;
  logo: string;

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
    console.log ('Busco equipo');
    this.http.get<any[]>(this.APIUrl)
    .subscribe( lista => {
                            this.listaEquipos = lista;
                            console.log ('Ya ha llegado');
                            console.log (this.listaEquipos);
                          }
              );
  }

  CrearEquipo () {
    let equipo = { "nombre": this.nombre,
                    "logo": this.file.name};

    this.http.post<any>(this.APIUrl, equipo).subscribe (() => this.DameEquipos()
    );



    const formData: FormData = new FormData();
    formData.append(this.file.name, this.file);
    // Enviamos la foto a un contenedor que se llama misFotos (que he creado antes en la API)
    this.http.post('http://localhost:3000/api/imagenes/LogosEquipos/upload', formData)
    // Cuando se haya subido la imagen guardamos el nombre del fichero en el vector de ficheros
      .subscribe(() => console.log ('ya esta')
    );
  }

  Asignar (equipo : any) {
    this.navCtrl.push (AsignarPage,{id : equipo.id });
  }

  ActivarInput () {
    // Recuperamos el input que estaba invisible y provocamos un click sobre ese input
    console.log ('Activar inut');
    document.getElementById ('inp').click();
  }

  Mostrar ($event) {
    this.file = $event.target.files[0];

    console.log ('fichero ' +this.file.name)
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      console.log ('ya');
      this.logo = reader.result.toString();
    };
  }
}
