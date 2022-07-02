import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [AuthService]
})
export class Tab1Page {
  public userForm: FormGroup;
  constructor( private router: Router,
    public formBuilder: FormBuilder,
    private auth: AuthService
    ){
      this.userForm= this.formBuilder.group({
        name: [''],
        birthdate: [''],
        mail: [''],
        password: [''],
        rol: [''],
        imageURL: [''],
        image_reference: [''],
        id: null
      })
    }
    

    async registerUser(){
    
      //referencia al método del servicio para Registrar
      //verificación de algun error
      const res = await this.auth.register(this.userForm.value).catch(error =>{
        alert("Algun accidente ocurrió")
        console.log('error', error);
      })
      //en caso de que exista respuesta
      if(res){
        console.log("Registro en FireAuthentication completo");
        const path = "users";
        //asignación del id de Fireauthentication al id del formulario
        const id= res.user.uid;
        this.userForm.patchValue({id: id});
        this.userForm.patchValue({imageURL: 'http://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg'});
        //impresión por consola de los datos del usuario registrado
        console.log("datos usuario", this.userForm.value)
        //creario usuario en Firestore
        this.auth.createUser(this.userForm.value, path);
      }
    }
    turista(){
      this.userForm.patchValue({rol: "turista"});
    }
    encargado(){
      this.userForm.patchValue({rol: "encargado"});
    }
    //función para redireccionar a login
    redirect(){
      this.router.navigate(['/login']);
    }

}
