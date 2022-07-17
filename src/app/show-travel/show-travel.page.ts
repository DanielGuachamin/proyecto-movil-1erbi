import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FireserviceService } from '../services/fireservice.service';

import { LugaresTuristicos } from './lugaresTuristicos.modal';
import { ServiceTuriscoService } from './service-turisco.service';

@Component({
  selector: 'app-show-travel',
  templateUrl: './show-travel.page.html',
  styleUrls: ['./show-travel.page.scss'],
})
export class ShowTravelPage implements OnInit {
  // los datos que tiene el array
  uidUser:string;
  todosloslugaresTuristicos: LugaresTuristicos[];
  constructor(
    private router: Router,
    private ServicioTuristico: ServiceTuriscoService,
    private fireService: FireserviceService,
    public afAuth :AngularFireAuth
  ) {}

  ngOnInit() {
    //traer todos los datos
    this.uidUser = localStorage.getItem('idUser')
    this.ServicioTuristico.obtenerLugaresTurisicos().subscribe((res) => {
      this.todosloslugaresTuristicos = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as LugaresTuristicos),
        };
      });
      console.log(this.todosloslugaresTuristicos);
    });
  }

  async logout() {
    this.fireService.logout();
    localStorage.clear();
    await this.afAuth.signOut();
  }
}
