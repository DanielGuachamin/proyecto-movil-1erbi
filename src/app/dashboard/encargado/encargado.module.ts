import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncargadoPageRoutingModule } from './encargado-routing.module';

import { EncargadoPage } from './encargado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncargadoPageRoutingModule
  ],
  declarations: [EncargadoPage]
})
export class EncargadoPageModule {}
