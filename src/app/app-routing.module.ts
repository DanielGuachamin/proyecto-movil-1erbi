import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { EncargadoGuard } from './guards/encargado.guard';
import { TuristaGuard } from './guards/turista.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'turista/:id',
    loadChildren: () => import('./dashboard/turista/turista.module').then( m => m.TuristaPageModule),
    canActivate: [TuristaGuard, AuthGuard]
  },
  {
    path: 'encargado/:id',
    loadChildren: () => import('./dashboard/encargado/encargado.module').then( m => m.EncargadoPageModule),
    canActivate: [EncargadoGuard, AuthGuard]
  },
  {
    path: 'admin/:id',
    loadChildren: () => import('./dashboard/admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AdminGuard, AuthGuard]
  },
  {
    path: 'Lugares-Turisticos-Ecuador',
    loadChildren: () => import('./show-travel/show-travel.module').then( m => m.ShowTravelPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalles-Lugares-Turisticos/:id',
    loadChildren: () => import('./details-travel/details-travel.module').then( m => m.DetailsTravelPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'geolocalizacion',
    loadChildren: () => import('./geolocalizacion/geolocalizacion.module').then( m => m.GeolocalizacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'useredit/:id',
    loadChildren: () => import('./useredit/useredit.module').then( m => m.UsereditPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
