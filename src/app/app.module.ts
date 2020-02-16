import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import component
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';

import {AuthGuard} from './auth.guard'
import {TokenInterceptorService} from './services/token-interceptor.service';
import { UserControlPanelComponent } from './components/user-control-panel/user-control-panel.component';
import { HidePasswordPipe } from './pipes/hide-password.pipe';
import {AlertifyComponent} from './shared/alertify/alertify.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TypeExpensesComponent } from './components/type-expenses/type-expenses.component';
import { CategoryComponent } from './components/category/category.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { CutCadenaPipe } from './pipes/cut-cadena.pipe';
import { ListComponent } from './components/myTranslator/list/list.component';
import { TranslationComponent } from './components/myTranslator/translation/translation.component';
import { CreateComponent } from './components/myTranslator/list/create/create.component';
import { UpdateComponent } from './components/myTranslator/list/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    HomeComponent,
    UserControlPanelComponent,
    HidePasswordPipe,
    AlertifyComponent,
    NavbarComponent,
    TypeExpensesComponent,
    CategoryComponent,
    ExpenseComponent,
    CutCadenaPipe,
    ListComponent,
    TranslationComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
