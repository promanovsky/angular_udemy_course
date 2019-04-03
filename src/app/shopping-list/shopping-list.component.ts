import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit/*, OnDestroy*/ {
  //ingredients: Ingredient[];
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  //sub: Subscription;

  constructor(private shoppingListService: ShoppingListService, private authService: AuthService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    //this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListState = this.store.select('shoppingList');
    /*this.sub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );*/
  }

  /*ngOnDestroy() {
    this.sub.unsubscribe();
  }*/

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

  isUserAuthenticate() {
    return this.authService.isAuthenticated();
  }
}
