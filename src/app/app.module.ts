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
import {AgmCoreModule} from '@agm/core';
import {APIServices} from './services/API/apiServices.service';
import {UploadService} from './services/DataService/upload.service';
import {QualificationDocumentService} from './services/DataService/qualificationDocument.service';
import {QualificationService} from './services/DataService/qualification.service';
import {ImagePopUpService} from './services/function/imagePopUp.service';
import {InductionDocumentService} from './services/DataService/inductionDocument.service';
import {InductionService} from './services/DataService/induction.service';



export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
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
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCaa9lro2eKyLYyOhPyR_OhKp9cWrFQtE0', libraries: ['places']
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
      APIServices,
      UploadService,
      QualificationService,
      QualificationDocumentService,
      InductionService,
      InductionDocumentService,
      ImagePopUpService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
