import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// component
import { HomeComponent } from './components/home/home.component'
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserControlPanelComponent } from './components/user-control-panel/user-control-panel.component'
import { TypeExpensesComponent } from './components/type-expenses/type-expenses.component';
import {CategoryComponent} from './components/category/category.component';
import { ExpenseComponent } from './components/expense/expense.component';
import {ListComponent} from './components/myTranslator/list/list.component';
import {CreateComponent} from './components/myTranslator/list/create/create.component';
import {UpdateComponent} from './components/myTranslator/list/update/update.component';
import {TranslationComponent} from './components/myTranslator/translation/translation.component';
import { AuthGuard } from './auth.guard'
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',

  },
  {
    path:'c_user',
    component:UserControlPanelComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'expense',
    component:ExpenseComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'category',
    component:CategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'type_expenses',
    component:TypeExpensesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 't_list',
    component: ListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 't_listCreate',
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 't_listUpdate/:id',
    component: UpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 't_translation',
    component: TranslationComponent,
   
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
