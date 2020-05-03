import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../user/login/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authService: AuthService) {

  }

  // get admin menu items when user is logged in by setting variables
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    // Listen to events for future changes
    this.authService.userLoggedIn.subscribe(
      (value) => {
        if (value){
     
          this.isLoggedIn = value;
        }
        else{
          this.isLoggedIn = false;

        }

      }
    );
  }
  
  logout(){
    this.authService.logout();
  }

}
