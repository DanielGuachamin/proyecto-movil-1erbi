import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/fireservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(public fireService:FireserviceService, public router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.fireService.logout();
    this.router.navigateByUrl('');
  }

}
