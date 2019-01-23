import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ProfesorPageModule } from '../pages/profesor/profesor.module';
import { CrearEquiposPageModule } from '../pages/crear-equipos/crear-equipos.module';
import { VerEquiposPageModule } from '../pages/ver-equipos/ver-equipos.module';
import { AsignarPageModule } from '../pages/asignar/asignar.module';
import { ComposicionPageModule } from '../pages/composicion/composicion.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    ProfesorPageModule,
    CrearEquiposPageModule,
    VerEquiposPageModule,
    AsignarPageModule,
    ComposicionPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
