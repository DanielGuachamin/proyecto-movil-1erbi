import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const haveRol = this.verifiedTurista()
    return haveRol;
  }

  verifiedTurista(){
    const uid = localStorage.getItem("idUser")
    if (!uid){
      console.log('No está loggeado')
      alert('No has iniciado sesión')
      this.router.navigate(['login'])
      return false;
    } else{
      console.log('Sí está loggeado')
      return true;
    }
  }
  
}
