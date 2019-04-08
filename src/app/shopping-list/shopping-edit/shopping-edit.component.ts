import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingLisActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscr: Subscription;
  editMode = false;
  editedIngredient: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscr = this.store.select('shoppingList').subscribe(
      data => {
        if(data.editedIngredient!=null){
          this.editedIngredient = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          });
        }else{
          this.editMode = false;
        }
      }
    )
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingLisActions.StopEditIngredient());
    this.subscr.unsubscribe();
  }

  onSubmitForm(form: NgForm) {
    if (this.editMode) {
      const ing = new Ingredient(
        this.editedIngredient.id,
        form.value.name,
        form.value.amount,
      );
      this.store.dispatch(new ShoppingLisActions.UpdateIngredient(ing));
    } else {
      const ing = new Ingredient(
        -1,
        form.value.name,
        form.value.amount,
      );
      this.store.dispatch(new ShoppingLisActions.AddIngredient(ing))
    }
    this.doResetForm();
  }

  doResetForm() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDeleteItem() {
    this.store.dispatch(new ShoppingLisActions.DeleteIngredient(this.editedIngredient));
    this.doResetForm();
  }

}
