import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsereditPage } from './useredit.page';

const routes: Routes = [
  {
    path: '',
    component: UsereditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsereditPageRoutingModule {}
