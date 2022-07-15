import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/fireservice.service';

@Component({
  selector: 'app-turista',
  templateUrl: './turista.page.html',
  styleUrls: ['./turista.page.scss'],
})
export class TuristaPage implements OnInit {

  constructor(public fireService:FireserviceService, public router:Router,) { }

  ngOnInit() {
  }
  logout(){
    this.fireService.logout();
    this.router.navigateByUrl('');
  }

}
