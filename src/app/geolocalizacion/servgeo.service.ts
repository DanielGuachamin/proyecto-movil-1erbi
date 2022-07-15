import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ImagenesTurista } from './Imagenes.modal';
import { IngresatlugaresTuristicos } from './IngresarTurista.model';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})
export class ServGeoService {
  speakerCollection: AngularFirestoreCollection<IngresatlugaresTuristicos>;
  constructor(private angularfirestore :AngularFirestore,private storage:AngularFirestore) {
    this.speakerCollection = angularfirestore.collection("SitiosTuristicosEcuador");
   }
   private CarpetaImagenes = "imagenLugaresTuristicos";

   // crear un nuevo perfil
   latitud:number;
  longitud:number;
  /*
  createPost(DatosTuris:IngresatlugaresTuristicos){
    return new Promise<any>((resolve,reject) =>{
      this.angularfirestore.collection("SitiosTuristicosEcuador").add(DatosTuris).then((response)=>{
        console.log(response)
      },(error)=>{
        reject(error.message)
      })
    })


  }
*/

  // cargar imagene
  

  cargarimagenesGeneroFirebase(imagenes: ImagenesTurista[], lugarTuris: IngresatlugaresTuristicos) {
    const storage = getStorage();
    for (const item of imagenes) {
     
      
      // para que la imagen se guarde con el nombre del generos y si hay espacio se unan y no halla problemas
     
      const path=`${this.CarpetaImagenes}/${lugarTuris.Nombre}/${lugarTuris.Propietario}`;      
      const storageResf = ref(storage, path);
      // a cargar la imagen
      const uploadImg = uploadBytesResumable(storageResf, item.imagen);
      uploadImg.on('state_changed', (snapshot) => {
        const imagenn = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      }, (error) => {
        console.log('error_imagen', error)

      }, () => {
        //obtener la url
        getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
         
          item.url = downloadURL;
       
         
         
             
             
           const  id = this.angularfirestore.createId(); 
          this.guadarImagenGeneros({
// aqui estan los datos que se enviar a la base de datos con la imagen
   
            Detalles:lugarTuris.Detalles,
            Imagen: item.url,
          
            id:id,
            Lugar:lugarTuris.Lugar,
            Nombre:lugarTuris.Nombre,
            Propietario:lugarTuris.Propietario

           
           
            

          } )
          console.log('imagen', item.url)
          
        })

      })

    }


  }

  // guardar la imagen
      
  async guadarImagenGeneros(turismo: { Detalles: string, Imagen: string, Lugar: string,Nombre:string,id:string,Propietario:string,}): Promise<any> {
  
    try {

      //
      const obtenerCoordenadas = await Geolocation.getCurrentPosition();
 //console.log('luagres',this.LugaresTuristicosForm.value)
  this.latitud=obtenerCoordenadas.coords.latitude;
  this.longitud=obtenerCoordenadas.coords.longitude;
      
      const  id = this.angularfirestore.createId(); 
      return await this.angularfirestore.collection('SitiosTuristicosEcuador').doc(id).set({id,
        Detalles:turismo.Detalles,
        Imagen:turismo.Imagen,
        Lugar:turismo.Lugar,
        Nombre:turismo.Nombre,
        Propietario:turismo.Propietario,
        Latitud:this.latitud,
        Longitud:this.longitud
          
      });
  
    } catch (error) {
      console.log('error al guadar imagen', error)

    }

  }

}


