import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';
import {switchMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private store: Store<fromApp.AppState>){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    //const copyReq = req.clone({headers: req.headers.set('','')});
    return this.store.select('auth')
      .pipe(take(1))
      .pipe(switchMap(
      (authState:fromAuth.State)=>{
        const copyReq = req.clone({params: req.params.set('auth', authState.token)});
        return next.handle(copyReq);
      }));
  }
}
