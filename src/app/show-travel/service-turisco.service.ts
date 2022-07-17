import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { LugaresTuristicos } from './lugaresTuristicos.modal';

@Injectable({
  providedIn: 'root'
})
export class ServiceTuriscoService {

  lugaresCollection: AngularFirestoreCollection<LugaresTuristicos>;

  constructor(private db: AngularFirestore) 
  {
    this.lugaresCollection=this.db.collection("SitiosTuristicosEcuador")
   }

  obtenerLugaresTurisicos (){
    
   //Traer todos los lugares turisticos
    return this.lugaresCollection.snapshotChanges()
  
    }
}
