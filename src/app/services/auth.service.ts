import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth, 
    private router: Router, 
    private firestore: AngularFirestore,
  ){ }
  getObject( id: string, path: string){
    
    //obtiene playlist segun el id
    return this.firestore//accede a Firestore
    .collection(path)//especifica la colección
    .doc(id)//especifica el documento
    .valueChanges()//obtiene el documento
  }
  login(user: User) {
    //método de firebase para acceder al sistema mediante el correo y contraseña
    return this.fireauth.signInWithEmailAndPassword(user.mail,user.password);
    
  }
  register(user: User) {
    //método de firebase para registrarse en el sistema mediante el correo y contraseña
    
    console.log("user value: ", user)
    //método de firebase para registrarse en el sistema mediante el correo y contraseña
    return this.fireauth.createUserWithEmailAndPassword(user.mail, user.password)
  }
  createUser(user: User, path: string){
    //ubica segun la dirección en la colección correspondiente
    this.firestore.collection(path)
    //crea segun la id registrada en direauthentication
    .doc(user.id)
    //establece al usuario segun los campos de usuario
    .set({id: user.id,
    mail: user.mail,
    password: user.password,
    name: user.name,
    birthdate: user.birthdate,
    rol: user.rol,
    imageURL: user.imageURL,
    image_reference: user.image_reference,
    });
  
  }
  logout(){
    //método de firebase para salir del sistema
    this.fireauth.signOut().then(()=>{
      //deshabilitar el token
      localStorage.removeItem('token');
      //redieccionar al Inicio de sesión
      this.router.navigate(['/login']);
    }, err=>{
      alert(err.message);

    })
  }
  forgotPassword(email : string) {
    //método de firebase para reestablecer contraseña mediante correo
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      //redireccionar al dashboard
      this.router.navigate(['dashboard']);
    }, err => {
      alert('Something went wrong');
    })
  }
}
