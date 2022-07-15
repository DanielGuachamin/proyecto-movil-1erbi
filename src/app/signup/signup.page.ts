import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public email: any;
  public password: any;
  public name: any;
  public imageURL: string =
    'http://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg';
  public rol: string = '';
  public image_reference: string = '';
  public registerForm: FormGroup;
  public user: any;
  people: any = [
    {
      name: 'Turista',
      value: 1,
    },
    {
      name: 'Encargado',
      value: 2,
    },
  ];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public fireService: FireserviceService
  ) {
    this.registerForm = this.formBuilder.group({
      mail: [''],
      password: [''],
      name: [''],
      imageURL: [
        'http://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg',
      ],
      rol: [''],
      image_reference: [''],
      uid: [''],
    });
  }
  setPerson(person) {
    console.log(person)
    alert(person)
  }


  ngOnInit() {}

  signup() {
    this.fireService.signup(this.registerForm.value).then(
      (res) => {
        if (res.user.uid) {
          /*let data = {
          email:this.email,
          password:this.password,
          name:this.name,
          uid:res.user.uid,
          imageURL: this.imageURL,
          image_reference: this.image_reference,
          rol: this.rol,
        }*/
          this.registerForm.get('uid').setValue(res.user.uid);
          let data = this.registerForm.value;
          this.fireService.saveDetails(data).then(
            (res) => {
              this.user = res;

              alert('Account Created!');
              switch (this.registerForm.get('rol').value) {
                case 'administrador': {
                  this.router.navigateByUrl(`admin/${data.uid}`);
                  break;
                }
                case 'turista': {
                  this.router.navigateByUrl(`turista/${data.uid}`);
                  break;
                }
                case 'encargado': {
                  this.router.navigateByUrl(`encargado/${data.uid}`);
                  break;
                }
                default: {
                  alert('revisa que el usuario tenga rol');
                  break;
                }
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        alert(err.message);

        console.log(err);
      }
    );
  }
  turista() {
    this.registerForm.get('rol').setValue('turista');
  }
  encargado() {
    this.registerForm.get('rol').setValue('encargado');
  }

  inicioSecion() {
    this.router.navigateByUrl('encargado');
  }
  logout() {
    this.router.navigateByUrl('');
  }
  mcqAnswer(answer) {
    console.log(answer);
  }
}
