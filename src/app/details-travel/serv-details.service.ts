import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LugaresTuristicos } from '../show-travel/lugaresTuristicos.modal';

@Injectable({
  providedIn: 'root'
})
export class ServDetailsService {
  DetalleslugaresCollection: AngularFirestoreCollection<LugaresTuristicos>;
  constructor(private db: AngularFirestore, private router: Router) 
  {
    this.DetalleslugaresCollection=db.collection("SitiosTuristicosEcuador")
   }



    DetallesLugaresTurisicos(id){
   
      return this.DetalleslugaresCollection.doc(id).valueChanges()
       }
}
