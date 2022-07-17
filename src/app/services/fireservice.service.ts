import { Injectable } from "@angular/core";
import { Auth, getAuth, onAuthStateChanged } from "@angular/fire/auth";
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
    public authService: Auth,
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

  getUserInfo(uid) {
    return this.firestore.collection("users").doc(uid).valueChanges();
  }

  updateProfile(uid:string, name:string) {
    console.log('esta parte antes del update funca')
    console.log('uid en servicio: ', uid)
    console.log('name de servicio: ', name)
    return this.firestore.collection("users").doc(uid).update({
      name: name
    });
  }

  // updateUser(object: any, url: any, path: any, id: any){
    
  //   return this.firestore.collection("users")
  //   //crea segun la id registrada en direauthentication
  //   .doc(id)
  //     //actualización de los siguientes campos de la canción
  //     .update({
  //       name: object.name,
  //       imageURL : url,
  //       image_reference: path
  //   })
    

  // }

  logout(){
    this.auth.signOut().then(()=>{
      //deshabilitar el token
      localStorage.removeItem('token');
      //redieccionar al Inicio de sesión
      this.router.navigateByUrl('');
    })
    
    
    
  }
}

