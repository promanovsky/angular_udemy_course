import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import {map} from 'rxjs/operators';
import * as fromAuth from '../auth/store/auth.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{

  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(id: number) {
    this.store.dispatch(new ShoppingListActions.StartEditIngredient(id));
  }

  isUserAuthenticate() {
    return this.store.select('auth').pipe(map(
      (authState: fromAuth.State)=>{
        return authState.authenticated;
      }));
  }
}
