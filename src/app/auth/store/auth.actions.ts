import {Action} from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const AUTH_SIGNUP = 'AUTH_SIGNUP';
export const AUTH_SIGNIN = 'AUTH_SIGNIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: {email: string, password: string}){}
}

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: {email: string, password: string}){}
}

export class AuthSignup implements Action {
  readonly type = AUTH_SIGNUP;
}

export class AuthSignin implements Action {
  readonly type = AUTH_SIGNIN;
}

export class AuthLogout implements Action {
  readonly type = AUTH_LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string){}
}

export type AuthActions = AuthSignup | AuthLogout | AuthSignin | SetToken | TrySignup | TrySignin;

