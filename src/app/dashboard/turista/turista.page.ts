import { Component, OnInit } from '@angular/core';
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
    // private menuController: MenuController
  ) {}

  ngOnInit() {
    this.uidUser = localStorage.getItem('idUser')
  }

  
  logout() {
    this.fireService.logout();
    localStorage.clear();
  }

  // toggleMenu() {
  //   this.menuController.toggle();
  // }
  
  // goToProfile() {
  //   this.router.navigate['/profile'];
  // }
}
