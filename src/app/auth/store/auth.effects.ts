import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import {map, mergeMap, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import {from, Observable} from 'rxjs'
import {Action} from '@ngrx/store';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActions.TRY_SIGNUP),
      map((action: AuthActions.TrySignup)=>{
        return action.payload;
      }),
      switchMap((authData: {email: string, password: string})=>{
        return from(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password));
      }),
      switchMap(()=>{
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string)=>{
        return [
          {
            type: AuthActions.AUTH_SIGNUP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  @Effect()
  authSignin: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActions.TRY_SIGNIN),
      map((action: AuthActions.TrySignin)=>{
        return action.payload;
      }),
      switchMap((authData: {email: string, password: string})=>{
        return from(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password));
      }),
      switchMap(()=>{
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string)=>{
        this.router.navigate(['/']);
        return [
          {
            type: AuthActions.AUTH_SIGNIN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  @Effect({dispatch: false})
  authLogout: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActions.AUTH_LOGOUT),
      mergeMap(()=>{
        this.router.navigate(['/']);
        return [];
      })
    );

  constructor(private actions$: Actions<AuthActions.AuthActions>, private router: Router){}
}
