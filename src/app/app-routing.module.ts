import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
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
export class AppRoutingModule {}
