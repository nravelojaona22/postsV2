import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';
  constructor(){
    const config = {
      apiKey: "AIzaSyA-T0_A4AZvoi_lr4FBUi2xkQJtmFnkKe0",
      authDomain: "blog-fd0d0.firebaseapp.com",
      databaseURL: "https://blog-fd0d0.firebaseio.com",
      projectId: "blog-fd0d0",
      storageBucket: "blog-fd0d0.appspot.com",
      messagingSenderId: "953694316328"
    };
    firebase.initializeApp(config);
  }
}
