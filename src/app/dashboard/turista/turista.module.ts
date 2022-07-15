import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TuristaPageRoutingModule } from './turista-routing.module';

import { TuristaPage } from './turista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TuristaPageRoutingModule
  ],
  declarations: [TuristaPage]
})
export class TuristaPageModule {}
