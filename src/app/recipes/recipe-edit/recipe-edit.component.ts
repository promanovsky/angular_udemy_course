import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import * as RecipesActions from '../store/recipe.actions'
import * as fromRecipes from '../store/recipe.reducers';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {Recipe} from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipeIngredients = new FormArray([]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeId;
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      recipeId = this.id;
      this.store.select('recipesList').pipe(take(1)).subscribe((recipeList: fromRecipes.State)=>{
        const recipe: Recipe = recipeList.recipes.find((item)=>{
          return item.id === this.id;
        });
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingredients']) {
          for(let ing of recipe.ingredients){
            this.recipeIngredients.push(new FormGroup({
              'id': new FormControl(ing.id),
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      'id': new FormControl(recipeId),
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': this.recipeIngredients
    });
  }

  onSubmit(){
    if (this.editMode){
      this.store.dispatch(new RecipesActions.UpdateRecipe(this.recipeForm.value));
    }else{
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }
    this.onNavigateToRecipes();
  }

  onNavigateToRecipes() {
    this.router.navigate(['/recipes']);
  }

  getIngredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    let newItem = new FormGroup({
        'id': new FormControl(null),
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }
    );
    this.recipeIngredients.push(newItem);
  }

  onDeleteIngredient(i: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

}
