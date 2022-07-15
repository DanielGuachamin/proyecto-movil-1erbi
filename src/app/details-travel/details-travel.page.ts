import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LugaresTuristicos } from '../show-travel/lugaresTuristicos.modal';
import { ServDetailsService } from './serv-details.service';
import { map } from '@firebase/util';
import { Console } from 'console';
import { Geolocation } from '@capacitor/geolocation';
declare var google;
@Component({
  selector: 'app-details-travel',
  templateUrl: './details-travel.page.html',
  styleUrls: ['./details-travel.page.scss'],
})

export class DetailsTravelPage implements OnInit {
  todosloslugaresTuristicos:LugaresTuristicos[];
  public datos_turisticos:any;
  public datallesForm:FormGroup;
  public url:any;
  latitud:number;
  longitud:number;
  public lat:any;
  public long:any;

  constructor(private router:Router,private fb:FormBuilder,private detallesServi:ServDetailsService, private activeRoute: ActivatedRoute
    ,public formBuilder:FormBuilder) {

      this.datallesForm = this.formBuilder.group({
        Detalles:[''],
        Imagen:[''],
        Lugar:[''],
        Nombre:[''],
        Propietario:[''],
        Latitud:[''],
        Longitud:[''],
      })

     }
    
  ngOnInit() {
    const id2 = this.activeRoute.snapshot.paramMap.get('id');
    this.detallesServi.DetallesLugaresTurisicos(id2).subscribe((res) =>{
     // laimagen 
  
     this.datos_turisticos=res
     this.url = this.datos_turisticos.Imagen
     this.lat =this.datos_turisticos.Latitud
     this.long=this.datos_turisticos.Longitud
     console.log('dato especifico',this.datos_turisticos)
     this.datallesForm = this.formBuilder.group({
      Detalles:[this.datos_turisticos.Detalles],
      Imagen:[this.datos_turisticos.Imagen],
      Lugar:[this.datos_turisticos.Lugar],
      Nombre:[this.datos_turisticos.Nombre],
      Propietario:[this.datos_turisticos.Propietario],
      Latitud:[this.datos_turisticos.Latitud],
      Longitud:[this.datos_turisticos.Longitud],
  

      

     })
 
 
     
     
    });
  }


  //geolocalizacion
  async obtenerCoordenadas(uno,dos){
   
    
  console.log('latitud',uno)
    var coord = {lat:uno ,lng: dos};
       var map = new google.maps.Map(document.getElementById('map'),{
         zoom: 10,
         center: coord
       });
       var marker = new google.maps.Marker({
         position: coord,
         map: map
       });
       return this.latitud
     }

}
