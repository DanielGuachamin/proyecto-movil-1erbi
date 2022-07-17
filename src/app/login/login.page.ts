import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from 'src/app/services/fireservice.service';
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
  public var;

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
    localStorage.clear();
    localStorage.setItem("recarga", "true");
  }


  login(){
    
    this.fireService.loginWithEmail(this.userForm.value).then(res=>{
      console.log(res);
      
      if(res.user.uid){
        this.fireService.getDetails({uid:res.user.uid}).subscribe(res=>{
          console.log(res);
          this.usuario= res;
          localStorage.setItem("idUser", this.usuario.uid);
          localStorage.setItem("rolUser", this.usuario.rol);
          this.var = localStorage.getItem("idUser");
          console.log('en storage: ', this.usuario.rol)
          //alert('Welcome '+ res['name']);
          switch(this.usuario.rol) { 
            case "administrador": { 
              this.router.navigate(["/admin/{{idUser}}"]);
               break; 
            } 
            case "turista": { 
              this.router.navigate(["/turista/{{idUser}}"]);
               break; 
            } 
            case "encargado": { 
              this.router.navigate(["/encargado/{{idUser}}"]);
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
    })
  }


  signup(){
    this.router.navigateByUrl('signup');
  }
}
