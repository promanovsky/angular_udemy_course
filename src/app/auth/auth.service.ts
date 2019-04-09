import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new AuthActions.AuthSignup());
          firebase.auth().currentUser.getIdToken().then(
            (token: string)=> {
              localStorage.setItem('token', token);
              this.store.dispatch(new AuthActions.SetToken(token));
            });
        }
      )
      .catch(error => console.log(error));
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response=> {
        this.store.dispatch(new AuthActions.AuthSignin());
        firebase.auth().currentUser.getIdToken().then(
          (token: string)=> {
            localStorage.setItem('token', token);
            this.store.dispatch(new AuthActions.SetToken(token));
        });
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }

  logOut() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.AuthLogout());
    localStorage.setItem('token', '');
  }

  initLocalStorageToken(){
    this.store.dispatch(new AuthActions.SetToken(localStorage.getItem('token')));
  }
}
