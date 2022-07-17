import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { LugaresTuristicos } from 'src/app/show-travel/lugaresTuristicos.modal';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  lugaresCollection: AngularFirestoreCollection<LugaresTuristicos>;

  constructor(private db: AngularFirestore) 
  {
    this.lugaresCollection=this.db.collection("SitiosTuristicosEcuador")
   }

  obtenerLugaresAdmin (){
    
   //Traer todos los lugares turisticos
    return this.lugaresCollection.snapshotChanges()
  
    }

  eliminarLugaresAdmin(lugar:LugaresTuristicos):Promise<any>{
      const storage = getStorage();
      const refLugares = ref(storage, lugar.Imagen)
      deleteObject(refLugares).then(()=>{
       // Swal.fire('EXITO','la imagen se elimino correctamente','success');
    
      }).catch((error)=>{
        console.log('no se elimino la imagen',error)
    
      });
      return this.lugaresCollection.doc(lugar.id).delete();
    
      }
}
