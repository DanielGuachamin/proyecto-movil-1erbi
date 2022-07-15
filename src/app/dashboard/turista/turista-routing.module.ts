import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TuristaPage } from './turista.page';

const routes: Routes = [
  {
    path: '',
    component: TuristaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TuristaPageRoutingModule {}
