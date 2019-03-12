import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormGroup, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

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

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscr = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(id);
        this.slForm.setValue({
           name: this.editedIngredient.name,
           amount: this.editedIngredient.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  onSubmitForm(form: NgForm) {
    if (this.editMode) {
      const ing = new Ingredient(
        this.editedIngredient.id,
        form.value.name,
        form.value.amount,
      );
      this.shoppingListService.updateIngredient(ing);
    } else {
      const id = this.shoppingListService.getLastId();
      const ing = new Ingredient(
        id,
        form.value.name,
        form.value.amount,
      );
      this.shoppingListService.addIngredient(ing);
    }
    this.doResetForm();
  }

  doResetForm() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDeleteItem() {
    this.shoppingListService.removeIngredient(this.editedIngredient);
    this.doResetForm();
  }

}
