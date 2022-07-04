import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocalizacionPageRoutingModule } from './geolocalizacion-routing.module';

import { GeolocalizacionPage } from './geolocalizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GeolocalizacionPageRoutingModule
  ],
  declarations: [GeolocalizacionPage]
})
export class GeolocalizacionPageModule {}
