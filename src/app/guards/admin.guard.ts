import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const haveRol = this.verifiedTurista()
    return haveRol;
  }

  verifiedTurista(){
    const rol = localStorage.getItem("rolUser")
    const uid = localStorage.getItem("idUser")
    if (rol == 'administrador'){
      console.log('Esta pasando un administrador')
      return true;
    } else{
      console.log('Este usuario no es un administrador')
      alert('Rol no autorizado para este contenido')
      this.router.navigate(['/profile',uid])
      return false;
    }
  }
  
}
