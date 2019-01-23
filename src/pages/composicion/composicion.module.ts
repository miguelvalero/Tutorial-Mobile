import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComposicionPage } from './composicion';

@NgModule({
  declarations: [
    ComposicionPage,
  ],
  imports: [
    IonicPageModule.forChild(ComposicionPage),
  ],
})
export class ComposicionPageModule {}
