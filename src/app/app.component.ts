import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'course-project';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBZoD2lH-_qAiXeh0kFY570g-jbqsoDFmw",
      authDomain: "ng-recipe-book-22.firebaseapp.com"
    });
    this.authService.initLocalStorageToken();
  }

}
