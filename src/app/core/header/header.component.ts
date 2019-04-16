import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {HttpEvent} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as fromAuth from '../../auth/store/auth.reducers'
import * as RecipeActions from '../../recipes/store/recipe.actions'
import {Observable} from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {}

  saveToDb() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
      },
      (error) => {console.log(error);
      }
    );
    this.dataStorageService.storeIngredients();
  }

  loadFromDb() {
    /*this.dataStorageService.loadRecipes().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {console.log(error);
      }
    );*/

    this.store.dispatch(new RecipeActions.FetchRecipes());

    this.dataStorageService.loadIngredients().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {console.log(error);
      }
    );
  }

  logOut(){
    this.store.dispatch(new AuthActions.AuthLogout());
    //this.authService.logOut();
    firebase.auth().signOut();
    localStorage.setItem('token', '');
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }
}
