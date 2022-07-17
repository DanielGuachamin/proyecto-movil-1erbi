import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router} from '@angular/router';
import { FireserviceService } from 'src/app/services/fireservice.service';
import { LugaresTuristicos } from 'src/app/show-travel/lugaresTuristicos.modal';
import { ServiceTuriscoService } from 'src/app/show-travel/service-turisco.service';
import { EncargadoService } from './encargado.service';
@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.page.html',
  styleUrls: ['./encargado.page.scss'],
})
export class EncargadoPage implements OnInit {

  todosloslugaresTuristicos:LugaresTuristicos[];
  uidUser:string;

  constructor(
    public fireService: FireserviceService,
    public router: Router,
    private encargadoService: EncargadoService,
    private zone: NgZone,
    public afAuth :AngularFireAuth
  ) {}

  ngOnInit() {
    this.recargaProcess();
    this.encargadoService.getPostEncargados().subscribe((res) => {
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

  // toggleMenu() {
  //   this.menuController.toggle();
  // }

  async logout() {
    this.fireService.logout();
    localStorage.clear();
    await this.afAuth.signOut();
  }

  reloadPage() {
    // click handler or similar
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }

  recargaProcess() {
    if (localStorage.getItem('recarga') === 'true') {
      console.log('recarga');
      localStorage.setItem('recarga', '');
      this.reloadPage();
    } else {
      console.log('no recarga');
    }
  }
}

