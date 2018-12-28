import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth : boolean;
  userLogin : string;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.isAuth = true;
          this.userLogin = user.email;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignout(){
    this.authService.signOutUser();
    this.isAuth = false;
  }

}
