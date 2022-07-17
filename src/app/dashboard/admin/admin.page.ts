import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FireserviceService } from 'src/app/services/fireservice.service';
import { LugaresTuristicos } from 'src/app/show-travel/lugaresTuristicos.modal';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  todosloslugaresTuristicos: LugaresTuristicos[];
  uidUser:string;

  constructor(
    private adminService: AdminService,
    private fireService: FireserviceService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    //traer todos los datos
    this.adminService.obtenerLugaresAdmin().subscribe((res) => {
      this.todosloslugaresTuristicos = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as LugaresTuristicos),
        };
      });
      console.log(this.todosloslugaresTuristicos);
    });
    this.uidUser = localStorage.getItem('idUser')
  }

  async eliminarLugar(lugarDelete){
    const alert = await this.alertController.create({
      header: '¿Está seguro de eliminar este sitio turístico?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          handler: () => {
            console.log('No confirmo')
          }
        },
        {
          text: 'Sí',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.adminService.eliminarLugaresAdmin(lugarDelete);
          }
        }
      ]
    });

    await alert.present();
    
}

  logout() {
    this.fireService.logout();
    localStorage.clear();
  }

}
