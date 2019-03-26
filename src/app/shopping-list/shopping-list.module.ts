import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

const shoppingListRouting: Routes = [
  {path: '', component: ShoppingListComponent},
];

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(shoppingListRouting)
  ],
  exports: [RouterModule]
})
export class ShoppingListModule {

}
