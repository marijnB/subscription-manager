import { Injectable, OnInit, AfterViewInit, Inject } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  currentUser = undefined;
  userLoggedIn = new EventEmitter ();

  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    // get from browser-storage
       if (localStorage.getItem('currentUser') != undefined){
           this.currentUser = this.storage.get('currentUser');
      }
  }


   // EVENT to change state user all over the site
  emitUserLoggedIn(){
    if (this.currentUser !== undefined){
      this.userLoggedIn.emit(true);
    }
      else{
        this.userLoggedIn.emit(false);
      }
  }

  // get
  getUsername(){
    if (this.currentUser != undefined){
       return (this.currentUser.userName);
    }
    else{
      return ''; 
    }
    
  }


  // returns true when user is logged in
  isLoggedIn(){
    if (this.currentUser !== undefined){
      return true
    }
    else{
      return false;
    }
  }

  // login clicked
  loginUser(userName, password){
      // This is a test, normally we call an api for savety reasons
      if(password === 'user' && userName === 'user'){
        this.currentUser ={
        id: 1,
        userName,
        firstName: 'Bnp',
        lastName: 'User'
       }
      }
      else{
        this.currentUser = undefined;
      }

      // set browser storage : this will storage the variable , even when the browser is closed
      this.setLocalStorage();

      // Event to change user all over the site
      this.emitUserLoggedIn();
  }

  logout(){
    this.currentUser = undefined;
    // reset local storage
    localStorage.setItem('currentUser', 'undefined');
    // push event to components that are using user status (app and nav)
    this.userLoggedIn.emit(false);
    // navigate to user
    this.router.navigate(['user']);
  }
  setLocalStorage(){
    this.storage.set('currentUser', this.currentUser);
  }
}
