import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  password;
  userName;
  loginForm;
  formInvalid = {userName: false, password: false};
  loginValid;
  //message authentication failed
  authFailed = false;

  constructor( private router: Router, private location: Location, private authService: AuthService){
  }

  login(formValues){
      // control if userName and password are filled in.
      if (formValues.form.controls.userName.invalid){
        this.formInvalid.userName = true;
      }
      else{
        this.formInvalid.userName = false;
      }

      if (formValues.form.controls.password.invalid){
        this.formInvalid.password = true;
      }
      else{
        this.formInvalid.password = false;

      }
      
      // executes only if the form is valid
      if(formValues.valid){
         this.authService.loginUser(formValues.controls.userName.value, formValues.controls.password.value);
         // control current user to show message or to go to admin page (when user is logged in)
         if(this.authService.currentUser === undefined){
           this.authFailed = true;
         }
         else{
             this.router.navigate(['user/subscribers']);
         }

      }

  }

  cancel(){
      this.location.back();
  }

}
