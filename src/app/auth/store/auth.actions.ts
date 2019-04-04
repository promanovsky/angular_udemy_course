import {Action} from '@ngrx/store';

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export class AuthLogin implements Action {
  readonly type = AUTH_LOGIN;
  constructor(public payload: any){}
}

export class AuthLogout implements Action {
  readonly type = AUTH_LOGOUT;
  constructor(public payload: any){}
}

export type AuthActions = AuthLogin | AuthLogout;

