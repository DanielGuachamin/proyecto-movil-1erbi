import { Component, OnInit } from '@angular/core';
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

  constructor(
    public fireService: FireserviceService,
    public router: Router,
    private encargadoService: EncargadoService
  ) {}

  ngOnInit() {
    this.encargadoService.getPostEncargados().subscribe((res) => {
      this.todosloslugaresTuristicos = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as LugaresTuristicos),
        };
      });
      console.log(this.todosloslugaresTuristicos);
    });
  }

  // toggleMenu() {
  //   this.menuController.toggle();
  // }

  logout() {
    this.fireService.logout();
    localStorage.clear();
  }
}