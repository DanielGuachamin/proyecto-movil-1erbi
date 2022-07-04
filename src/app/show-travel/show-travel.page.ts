import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LugaresTuristicos } from './lugaresTuristicos.modal';
import { ServiceTuriscoService } from './service-turisco.service';

@Component({
  selector: 'app-show-travel',
  templateUrl: './show-travel.page.html',
  styleUrls: ['./show-travel.page.scss'],
})
export class ShowTravelPage implements OnInit {
// los datos que tiene el array
todosloslugaresTuristicos:LugaresTuristicos[];
  constructor(private router:Router,private ServicioTuristico:ServiceTuriscoService ) { }

  ngOnInit() {
    //traer todos los datos
    this.ServicioTuristico.obtenerLugaresTurisicos().subscribe((res) =>{
      
      
      this.todosloslugaresTuristicos = res.map((e) =>{
     
        return {
          
          id: e.payload.doc.id,      
          ...(e.payload.doc.data() as LugaresTuristicos)
          
        };
       
       
      });
      console.log(this.todosloslugaresTuristicos)
    
     
     
    });

  }

}
