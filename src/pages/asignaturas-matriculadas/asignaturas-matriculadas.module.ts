import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsignaturasMatriculadasPage } from './asignaturas-matriculadas';

@NgModule({
  declarations: [
    AsignaturasMatriculadasPage,
  ],
  imports: [
    IonicPageModule.forChild(AsignaturasMatriculadasPage),
  ],
})
export class AsignaturasMatriculadasPageModule {}
