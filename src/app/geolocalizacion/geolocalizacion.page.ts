
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
// para implementar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServGeoService } from './servgeo.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ImagenesTurista } from './Imagenes.modal';

declare let google;
@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})



export class GeolocalizacionPage implements OnInit {

  coordenades = false;
  latitudPublica = 0;
  longitudPublica = 0;
  imagenes: ImagenesTurista[]=[];
  public usuario: string;
  imgURL='https://images.pexels.com/photos/7403878/pexels-photo-7403878.jpeg?auto=compress&cs=tinysrgb&w=600';
  file: any;
// para ingresar los lugares
public LugaresTuristicosForm: FormGroup;
  latitud: number;
  longitud: number;
  isChanged = false;
   constructor(public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,private geolocalizacion: ServGeoService,private db: AngularFirestore) {
      const  id = this.db.createId();


      //GEOLOCALIZACION

      this.LugaresTuristicosForm = this.formBuilder.group({

        Detalles:[''],

        Lugar:[''],
        Nombre:[''],
        Propietario: [''],
        Latitud:[''],
        Longitud:[''],
        id:[id],


        });
    }

    async obtenerCoordenadas(){
      this.coordenades = true;
  const obtenerCoordenadas = await Geolocation.getCurrentPosition();
 //console.log('luagres',this.LugaresTuristicosForm.value)
  this.latitud=obtenerCoordenadas.coords.latitude;
  this.longitud=obtenerCoordenadas.coords.longitude;
  this.latitudPublica=obtenerCoordenadas.coords.latitude;
  this.longitudPublica=obtenerCoordenadas.coords.longitude;
   }

  ngOnInit() {
    alert('Recuerde activar su Ubicación, para poder registar un sitio turístico.');
    this.usuario = localStorage.getItem('idUser');
    console.log('usuario uid: ', this.usuario);
  }
// enviar los lugares turisticos
  onSubmit() {
    const  cargar: any={
      Detalles:this.LugaresTuristicosForm.value.Detalles,
      Lugar:this.LugaresTuristicosForm.value.Lugar,
      Nombre:this.LugaresTuristicosForm.value.Nombre,
      Propietario:this.LugaresTuristicosForm.value.Propietario
    };
    this.geolocalizacion.cargarimagenesGeneroFirebase(this.imagenes,cargar);
     console.log('cargar',cargar);

   }

   selectChange(event: any){
    //traer la imagens
    //console.log(event.target.files);
    //para visualizar la imagen que vamos a subir
     this.isChanged=false;
    if(event.target.files.length>0){

      this.file=event.target.files;
      // para que pueda leer el ti`po de dato
      const reader= new FileReader();
      reader.readAsDataURL(this.file[0]);
      reader.onloadend =(event: any)=>{
        this.imgURL= event.target.result;
        this.imagenes.push({
          imagen:this.file[0]
        });

      };

    }else{
      this.imgURL;

    }

  }

}
