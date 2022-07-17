import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FireserviceService } from '../services/fireservice.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.page.html',
  styleUrls: ['./useredit.page.scss'],
})
export class UsereditPage implements OnInit {

  public uid:string;
  public user:any;
  public name:string;
  profileForm: FormGroup;

  constructor(private fireService: FireserviceService, private router: Router) {
    this.profileForm = new FormGroup({
      name: new FormControl('')
    })
  }

  ngOnInit() {
    const uid = localStorage.getItem("idUser")
    this.uid = uid
    this.fireService.getUserInfo(uid).subscribe(response => {
      this.user = response;
      console.log('formulario de editar: ', response);
      this.profileForm.reset(response)
     
    })
  }

  modifiedProfile(){
    const name = this.profileForm.get('name').value
    const uid = localStorage.getItem('idUser')
    console.log('name de form: ', name)
    this.fireService.updateProfile(uid, name)
    this.router.navigate[('profile/'+uid)]
  }

}
