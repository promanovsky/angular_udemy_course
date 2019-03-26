import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {RecipesService} from '../recipes/recipes.service';
import {AuthGuardService} from '../auth/auth-guard.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports:[
    FormsModule,
    SharedModule,
    AppRoutingModule
  ],
  exports:[
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [ShoppingListService, RecipesService, DataStorageService, AuthService, AuthGuardService]
})
export class CoreModule {

}
