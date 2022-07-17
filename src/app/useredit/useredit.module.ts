import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsereditPageRoutingModule } from './useredit-routing.module';

import { UsereditPage } from './useredit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsereditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UsereditPage]
})
export class UsereditPageModule {}
