import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [AuthService]
})
export class Tab2Page {
  public userForm: FormGroup;
  public user: any;
  constructor(private auth: AuthService, 
    public formBuilder: FormBuilder, 
    private router : Router,
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
    async login(){
    
      //referencia al método del servicio para Iniciar sesión
      //verificación de algun error
      const res = await this.auth.login(this.userForm.value).catch(error =>{
        alert("Algun accidente ocurrió")
        console.log('error', error);
      })
     //en caso de que exista respuesta
      if(res){
          console.log("inicio exitoso");
          const path = "users";
          //asignación del id de Fireauthentication al id del formulario
          const id:string= res.user.uid;
          console.log("id user: ", id)
          //impresión por consola de los datos del usuario registrado
          console.log("datos usuario", this.userForm.value)
          console.log("colección", path)
          //creario usuario en Firestore
          await this.auth.getObject(id, path).subscribe( res =>{
            this.user = res;
            console.log("datos del usuario", this.user);
            
            switch(this.user.rol) { 
              case "administrador": { 
                this.router.navigate(['/admnistrador', this.user.id])
                 break; 
              } 
              case "turista": { 
                this.router.navigate(['/turista', this.user.id])
                 break; 
              } 
              case "encargado": { 
                this.router.navigate(['/encargado', this.user.id])
                break; 
             }
              default: { 
                 alert("revisa que el usuario tenga rol")
                 break; 
              } 
           } 
  
          })
          
            
          //redireccionar a la vista principal
          
    
        }
    
      
     
  
    }
    redirect(){
      this.router.navigate(['/register']);
    }

}
