import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/fireservice.service';
@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.page.html',
  styleUrls: ['./encargado.page.scss'],
})
export class EncargadoPage implements OnInit {

  constructor(public fireService:FireserviceService, public router:Router) { }

  ngOnInit() {
  }
  logout(){
    this.fireService.logout();
    this.router.navigateByUrl('');
  }

}
