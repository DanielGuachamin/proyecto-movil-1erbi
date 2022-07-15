import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class FireserviceService {
  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router
  ) {}

  loginWithEmail(data: any) {
    return this.auth.signInWithEmailAndPassword(data.mail, data.password);
  }

  signup(data: any) {
    return this.auth.createUserWithEmailAndPassword(data.mail, data.password);
  }

  saveDetails(data: any) {
    return this.firestore.collection("users").doc(data.uid).set(data);
  }
  getDetails(data: any) {
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }
  logout(){
    this.auth.signOut().then(()=>{
      //deshabilitar el token
      localStorage.removeItem('token');
      //redieccionar al Inicio de sesión
      this.router.navigateByUrl('');
    })
    
    
    
  }
}

