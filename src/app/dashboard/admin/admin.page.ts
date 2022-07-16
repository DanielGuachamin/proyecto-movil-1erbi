import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FireserviceService } from 'src/app/services/fireservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(public fireService:FireserviceService, public router:Router, private menuController:MenuController) { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  logout() {
    this.fireService.logout();
    this.router.navigateByUrl('');
  }

}
