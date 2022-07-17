import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private fireService: FireserviceService) {
    this.profileForm = new FormGroup({
      name: new FormControl('')
    })
  }

  ngOnInit() {
    this.uid = localStorage.getItem('userId')
    this.fireService.getUserInfo(this.uid).subscribe(response => {
      
      this.user = response;
      console.log('formulario de editar: ', response);
      this.profileForm.reset(this.user)
     
    })
  }

  modifiedProfile(){
    const name = this.profileForm.get('name').value
    const uid = localStorage.getItem('userId')
    console.log('name de form: ', name)
    this.fireService.updateProfile(name)
  }

}
