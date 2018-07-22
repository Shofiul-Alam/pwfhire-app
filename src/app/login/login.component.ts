import { Component, OnInit } from '@angular/core';
import {ValidationService} from '../services/form/formValidation.service';
import {AuthRequest} from '../models/AuthRequest';
import {LoginService} from '../services/login.service';
import {AuthResponse} from '../models/AuthResponse';
import {AccessLevel} from '../models/ServiceModel/AccessLevel';
import {Page} from '../models/ViewModel/Page';
import {AuthService} from '../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public title: string;
    public loginDetails: AuthRequest = new AuthRequest();
    public authentication: AuthResponse = new AuthResponse();
    public identity: any = {};
    public accessLevel: AccessLevel = new AccessLevel();
    public page: Page = new Page();

  constructor(
      private floating: ValidationService,
      private _loginService: LoginService,
      private _authService: AuthService,
      private  _router: Router,
      private  _route: ActivatedRoute,
  ) { }

  ngOnInit() {
      this.floating.floatLabel();
  }
  onSubmit() {
      this.page.loader = true;
      this.loginDetails.grant_type = 'password';
      this._loginService.login(this.loginDetails).subscribe(
          response => {
              Object.assign(this.authentication, response);
              console.log(this.authentication);
              localStorage.setItem('access_token', this.authentication.access_token);
              this._loginService.accessLevel().subscribe(
                  res => {
                      this.page.cssClass = Page.SUCCESS;
                      this.page.message = '!!! ' + this.loginDetails.username + ' has been successfully logged in.';
                      Object.assign(this.accessLevel, res);
                      localStorage.setItem(btoa('access_level'), btoa(this.accessLevel.access_level));
                      const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
                      this.page.loader = false;
                      this.afterLoginRedirect(returnUrl);
                  },
                  error => {
                      console.log(<any> error);
                  }
              );
          },
          error => {
              console.log(<any> error);
          }
      );

      return null;
  }

  afterLoginRedirect(returnUrl) {
          if (this._authService.isAdmin()) {
              this._router.navigate([returnUrl || '/dashboard']);
          }
          if (this._authService.isEmployee()) {
              this._router.navigate([returnUrl || '/employee']);
          }
          if (this._authService.isClient()) {
              this._router.navigate([returnUrl || '/client/profile']);
          }
  }

}
