import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarSeleccionadosPage } from './mostrar-seleccionados';

@NgModule({
  declarations: [
    MostrarSeleccionadosPage,
  ],
  imports: [
    IonicPageModule.forChild(MostrarSeleccionadosPage),
  ],
})
export class MostrarSeleccionadosPageModule {}
