import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email:any;
  public password:any;
  public usuario: any;
  public userForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router:Router,
    public fireService:FireserviceService
  ) {
    this.userForm= this.formBuilder.group({
      mail: [''],
      password: [''],
    })
   }

  ngOnInit() {
  }


  login(){
    this.fireService.loginWithEmail(this.userForm.value).then(res=>{
      console.log(res);
      
      if(res.user.uid){
        this.fireService.getDetails({uid:res.user.uid}).subscribe(res=>{
          console.log(res);
          this.usuario= res;
          //alert('Welcome '+ res['name']);
          switch(this.usuario.rol) { 
            case "administrador": { 
              this.router.navigateByUrl(`admin/${this.usuario.uid}`)
               break; 
            } 
            case "turista": { 
              this.router.navigateByUrl(`turista/${this.usuario.uid}`)
               break; 
            } 
            case "encargado": { 
              this.router.navigateByUrl(`encargado/${this.usuario.uid}`)
              break; 
           }
            default: { 
               alert("revisa que el usuario tenga rol")
               break; 
            } 
         } 
        },err=>{
          console.log(err);
        });
      }
    },err=>{
      alert(err.message)
      console.log('esto es un error no sea cojudo', err);
    })
  }


  signup(){
    this.router.navigateByUrl('signup');
  }
}
