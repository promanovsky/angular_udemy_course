import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../../recipes/store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<fromRecipe.State>;


  constructor(private router: Router, private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.recipesState = this.store.select('recipesList');
  }

  navigateToNewRecipe() {
    if(this.isUserAuthenticate()){
      this.router.navigate(['new'], {relativeTo: this.route});
    }else{
      this.router.navigate(['/signin']);
    }
  }

  isUserAuthenticate() {
    return this.store.select('auth').pipe(map(
      (authState: fromAuth.State)=>{
        return authState.authenticated;
      }));
  }
}
