import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/services/fireservice.service';
import {
  Storage,
} from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;
  selectedFile: any = null;
  urlProfilePic: string = '';
  public usuario:any;
  public rol:string;
  public mail:string;
  public name:string;
  public urlImg:string;
  public uid:string;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public fireService: FireserviceService,
    public storage: Storage
  ) {
    this.profileForm = new FormGroup({
      mail: new FormControl(''),
      name: new FormControl(''),
      imageURL: new FormControl('http://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg'),
      rol: new FormControl(''),
      image_reference: new FormControl(''),
      uid: new FormControl(''),
    });
  }



  ngOnInit() {
    const uid = localStorage.getItem("idUser")
    this.uid = uid
    this.fireService.getUserInfo(uid).subscribe(response => {
      console.log('res: ', response);
      this.usuario = response
      console.log('res: ', this.usuario);
      this.name = this.usuario.name;
      this.rol = this.usuario.rol;
      this.mail = this.usuario.mail;
      this.urlImg = this.usuario.imageURL
    })
  }



  modifiedProfile(){

  }

}
