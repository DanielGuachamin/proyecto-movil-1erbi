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

  public redirect:string;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public fireService: FireserviceService,
    public storage: Storage
  ) {
    this.profileForm = new FormGroup({
      mail: new FormControl(''),
      name: new FormControl(''),
      imageURL: new FormControl('https://firebasestorage.googleapis.com/v0/b/ionicimagen-358b2.appspot.com/o/profileImage.jpeg?alt=media&token=453d3b39-836b-43aa-a6f6-c6aab93eed6b'),
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

  dashboard(){
    switch(this.usuario.rol) { 
      case "turista": { 
        this.router.navigate(['/turista', localStorage.getItem("idUser")])
         break; 
      } 
      case "encargado": { 
        this.router.navigate(['/encargado', localStorage.getItem("idUser")])
         break; 
      } 
      case "administrador": { 
        this.router.navigate(['/admin', localStorage.getItem("idUser")])
        break; 
     }
      default: { 
         alert("revisa que el usuario tenga rol")
         break; 
      } 
   }
  }

}
