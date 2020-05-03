import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from './user/login/auth.service';
import { JQ_TOKEN } from './common/jQuery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'subscriptionManager';
  isLoggedIn:Boolean = false;
  currentUser = undefined;
  constructor(private authService: AuthService,  @Inject(JQ_TOKEN)private $:any ) {
  }

  ngOnInit(): void {
    this.isLoggedIn =  this.authService.isLoggedIn();
    this.currentUser = this.authService.getUsername();

    // values to show current user in NAV if user is logged in
    this.authService.userLoggedIn.subscribe(
      (value) =>{
            if (value){
              this.isLoggedIn = value;
              this.currentUser = this.authService.getUsername();
            }
            else{
              this.isLoggedIn = false;
              this.currentUser = undefined;
            }

      }
    )
  }

}
 