import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppService} from './services/base/app.service';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundComponent} from './404/not-found.component';
import { UnauthoriziedComponent } from './401/unauthorizied.component';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {AdminAuthGuardService} from './services/auth/admin-auth-guard.service';
import {ClientAuthGuardService} from './services/auth/client-auth-guard.service';
import {ValidationService} from './services/form/formValidation.service';
import {EmployeeAuthGuardService} from './services/auth/employee-auth-guard.service';
import {LoginRegisterGuardService} from './services/auth/login-register-guard.service';
import {EmployeeService} from './services/DataService/employee.service';
import {UserService} from './services/DataService/user.service';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['pwfhire.pb'],
            blacklistedRoutes: ['pwfhire.pb/auth/']
        }
    })
  ],
  providers: [
      AppService,
      AuthService,
      AuthGuardService,
      AdminAuthGuardService,
      ClientAuthGuardService,
      EmployeeAuthGuardService,
      ValidationService,
      LoginRegisterGuardService,
      EmployeeService,
      UserService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
