import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'turista/:id',
    loadChildren: () => import('./dashboard/turista/turista.module').then( m => m.TuristaPageModule)
  },
  {
    path: 'encargado/:id',
    loadChildren: () => import('./dashboard/encargado/encargado.module').then( m => m.EncargadoPageModule)
  },
  {
    path: 'admin/:id',
    loadChildren: () => import('./dashboard/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'Lugares-Turisticos-Ecuador',
    loadChildren: () => import('./show-travel/show-travel.module').then( m => m.ShowTravelPageModule)
  },
  {
    path: 'detalles-Lugares-Turisticos/:id',
    loadChildren: () => import('./details-travel/details-travel.module').then( m => m.DetailsTravelPageModule)
  },
  {
    path: 'geolocalizacion',
    loadChildren: () => import('./geolocalizacion/geolocalizacion.module').then( m => m.GeolocalizacionPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
