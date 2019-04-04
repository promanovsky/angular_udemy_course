import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';
import {HttpClient} from '@angular/common/http';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';
export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const SAVE_INGREDIENTS = 'SAVE_INGREDIENTS';

export class AddIngredient implements Action{
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action{
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action{
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action{
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class StartEditIngredient implements Action{
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEditIngredient implements Action{
  readonly type = STOP_EDIT;
}

export class LoadIngredients implements Action{
  readonly type = LOAD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class SaveIngredients implements Action{
  readonly type = SAVE_INGREDIENTS;
  constructor(public httpClient: HttpClient) {}
}

export type ShoppingListActions =
  AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient |
  StartEditIngredient | LoadIngredients | SaveIngredients | StopEditIngredient;
