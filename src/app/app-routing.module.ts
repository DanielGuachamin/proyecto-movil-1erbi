import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './dashboard/administrador/administrador.component';
import { EncargadoComponent } from './dashboard/encargado/encargado.component';
import { TuristaComponent } from './dashboard/turista/turista.component';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {path: 'login', component:Tab2Page},
  {path: 'register', component:Tab1Page},
  {path: 'admnistrador/:id', component:AdministradorComponent},
  {path: 'turista/:id', component:TuristaComponent},
  {path: 'encargado/:id', component:EncargadoComponent},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
