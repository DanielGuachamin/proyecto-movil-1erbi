import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FireserviceService } from 'src/app/services/fireservice.service';

@Component({
  selector: 'app-turista',
  templateUrl: './turista.page.html',
  styleUrls: ['./turista.page.scss'],
})
export class TuristaPage implements OnInit {
  uidUser:string;
  constructor(
    public fireService: FireserviceService,
    public router: Router,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.recargaProcess();
    this.uidUser = localStorage.getItem('idUser')
  }

  
  logout() {
    this.fireService.logout();
    localStorage.clear();
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
