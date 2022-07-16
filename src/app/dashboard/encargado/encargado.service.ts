import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {

  public usuario: any;

  constructor(private db: AngularFirestore, private router: Router,private storage: AngularFirestore) { }

  getPostEncargados (){
    
    this.usuario = localStorage.getItem("idUser")
   
    return this.db.collection("SitiosTuristicosEcuador",ref => ref.where('idItem', '==', this.usuario)).snapshotChanges()
  
    }
}
