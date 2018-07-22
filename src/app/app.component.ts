import {Component, OnInit} from '@angular/core';
import {AuthRequest} from './models/AuthRequest';
import {AuthService} from './services/auth/auth.service';
import {AuthResponse} from './models/AuthResponse';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AppService} from './services/base/app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private authRequest: AuthRequest = new AuthRequest();
  private clientAuth: AuthResponse = new AuthResponse();
  constructor(
      private _authService: AuthService,
      private _appService: AppService,
      public jwtHelper: JwtHelperService,
  ) {}
  ngOnInit() {
      this.authRequest.grant_type = 'client_credentials';
      if (!this._authService.isAuthenticatedMachine()) {
          this.authenticateMachine();
      }
  }

  authenticateMachine () {
      this._authService.getClientToken(this.authRequest).subscribe(
          response => {
              Object.assign(this.clientAuth, response);
              localStorage.setItem('machine_access_token', this.clientAuth.access_token);
              console.log(this._authService.isAuthenticatedMachine());
          },
          error => {
              console.log(<any> error);
          }
      );
  }

}


