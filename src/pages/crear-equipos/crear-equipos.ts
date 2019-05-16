import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AsignarPage} from '../asignar/asignar';
import { Http, RequestOptions, Headers, Response, ResponseContentType } from '@angular/http';

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
  image: string;
  imagenes: string[] = [];
  numeroLogos: number;
  logosCargados: number =0;
  logos: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient, private http2: Http) {
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
                            this.TraeLogos ();
                          }
              );
  }

  TraeLogos ()
  {
    // miro cuántos logos tengo que traer
    this.numeroLogos = this.listaEquipos.filter(equipo => equipo.logo != null).length;
    console.log ('NumeroLogos '+ this.numeroLogos);
    for (let equipo of this.listaEquipos) {
      if (equipo.logo != null) {

        console.log ('Equipo' +equipo.nombre);
        this.http2.get('http://localhost:3000/api/logosequipos/logos/download/' + equipo.logo,
                            { responseType: ResponseContentType.Blob } )
                            .subscribe(response => this.CargarLogo(response));

      }
    }
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
          this.imagenes.push(reader.result.toString());

          // Ya tengo un logo más
          this.logosCargados++;

          if (this.logosCargados == this.numeroLogos)
          // Ya los he traido todos
          // Ahora voy a crear un vector con tantas posiciones como equipos. Si el equipo no tiene logo
          // pondre null y si tiene logo entonces le pondré el siguiente logo de los que me he traido
          {
            let j:number =0;
            for (let equipo of this.listaEquipos) {
              if (equipo.logo != null) {
                this.logos.push (this.imagenes[j++])
              }
              else {
                this.logos.push (null);
              }
            }
          }


      }, false);

      // Aqui es donde ordeno que se lea la imagen y se prepare la URL
      if (blob) {
          reader.readAsDataURL(blob);
      }


  }

  CrearEquipo () {
    console.log ('estoy en crear' + this.nombre);
    let equipo = { "nombre": this.nombre,
                    "logo": this.file.name};

    this.http.post<any>(this.APIUrl, equipo).subscribe (() => this.DameEquipos()
    )
      // Esta es la función que envia a la API la imagen que acabamos de seleccionar
    // Ponemos los datos del fichero (nombre y el contenido) en un FormData, que es lo que enviamos a la API
    const formData: FormData = new FormData();
    formData.append(this.file.name, this.file);
    // Enviamos la foto a un contenedor que se llama misFotos (que he creado antes en la API)
    this.http.post('http://localhost:3000/api/logosequipos/logos/upload', formData)
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
      this.image = reader.result.toString();
    };
  }
}
