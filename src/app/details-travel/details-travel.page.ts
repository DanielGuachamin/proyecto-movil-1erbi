import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LugaresTuristicos } from '../show-travel/lugaresTuristicos.modal';
import { ServDetailsService } from './serv-details.service';
declare var google;
@Component({
  selector: 'app-details-travel',
  templateUrl: './details-travel.page.html',
  styleUrls: ['./details-travel.page.scss'],
})
export class DetailsTravelPage implements OnInit {
  todosloslugaresTuristicos: LugaresTuristicos[];
  public uid:any;
  public rol:any;
  public datos_turisticos: any;
  public datallesForm: FormGroup;
  public url: any;
  latitud: number;
  longitud: number;
  public lat: any;
  public long: any;
  public googleUrl: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private detallesServi: ServDetailsService,
    private activeRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController
  ) {
    this.datallesForm = this.formBuilder.group({
      Detalles: [''],
      Imagen: [''],
      Lugar: [''],
      Nombre: [''],
      Propietario: [''],
      Latitud: [''],
      Longitud: [''],
    });
  }

  ngOnInit() {
    const uid = localStorage.getItem("idUser")
    this.uid = uid
    const rol = localStorage.getItem("rolUser")
    this.rol = rol
    const id2 = this.activeRoute.snapshot.paramMap.get('id');
    this.detallesServi.DetallesLugaresTurisicos(id2).subscribe((res) => {
      // laimagen
      this.lat=0;
      this.long=0;
      this.datos_turisticos = res;
      this.url = this.datos_turisticos.Imagen;
      this.lat = this.datos_turisticos.Latitud;
      this.long = this.datos_turisticos.Longitud;
      this.googleUrl = `https://www.google.es/maps?q=${this.lat},${this.long}&output=embed`;
      console.log('url de mapa: ', this.googleUrl);
      console.log('dato especifico', this.datos_turisticos);
      this.datallesForm = this.formBuilder.group({
        Detalles: [this.datos_turisticos.Detalles],
        Imagen: [this.datos_turisticos.Imagen],
        Lugar: [this.datos_turisticos.Lugar],
        Nombre: [this.datos_turisticos.Nombre],
        Propietario: [this.datos_turisticos.Propietario],
        Latitud: [this.datos_turisticos.Latitud],
        Longitud: [this.datos_turisticos.Longitud],
      });
      
      this.showLoading(this.lat, this.long)
    });
  }

  
  returnToShow(){
    this.lat = null;
    this.long = null;
    const rol = this.rol
    switch(rol) { 
      case "turista": { 
        this.router.navigate(['/turista', localStorage.getItem("idUser")])
         break; 
      } 
      case "encargado": { 
        this.router.navigate(['/encargado', localStorage.getItem("idUser")])
         break; 
      } 
      case "administrador": { 
        this.router.navigate(['/admin', localStorage.getItem("idUser")])
        break; 
     }
      default: { 
         alert("revisa que el usuario tenga rol")
         break; 
      } 
   }
  }
  async showLoading(uno, dos) {
    const loading = await this.loadingCtrl.create({
      message: 'Estamos cargando la información para ti...',
      duration: 4000,
      cssClass: 'custom-loading'
    });
    
    loading.present();
    this.obtenerCoordenadas(uno, dos)
  }
  //geolocalizacion
  async obtenerCoordenadas(uno, dos) {
    try {
      console.log('latitud', uno);
      var coord = { lat: uno, lng: dos };
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: coord,
      });
      var marker = new google.maps.Marker({
        position: coord,
        map: map,
      });
      return this.latitud;
    } catch (error) {
      console.log(error);
      console.log('algo fue mal con el mapa')
    }
  }
}
