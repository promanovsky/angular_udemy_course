import * as AuthActions from './auth.actions'

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducers(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type){
    case AuthActions.AUTH_SIGNUP:
    case AuthActions.AUTH_SIGNIN:
      return {
        ... state,
        authenticated: true
      };
    case AuthActions.AUTH_LOGOUT:
      return {
        ... state,
        token: null,
        authenticated: false
      };
    default:
      return state;
  }
}
