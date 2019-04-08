import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfesorPage } from '../pages/profesor/profesor';
import { CrearEquiposPage } from '../pages/crear-equipos/crear-equipos';
import {VerEquiposPage } from '../pages/ver-equipos/ver-equipos';
import { VerAsignaturasPage } from '../pages/ver-asignaturas/ver-asignaturas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>
  Home:any = HomePage;
  P2: any= ProfesorPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Ver alumnos', component: ProfesorPage },
      { title: 'Crear equipos', component: CrearEquiposPage },
      { title: 'Ver equipos', component: VerEquiposPage },
      { title: 'Ver asignaturas', component: VerAsignaturasPage },
    ];
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

