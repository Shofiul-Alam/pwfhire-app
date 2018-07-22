import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  constructor(
      private _authService: AuthService,
      private _router: Router,
  ) { }

  ngOnInit() {

  }

    redirectUrl() {
        if (this._authService.isAdmin()) {
            this._router.navigate(['/dashboard']);
        }
        if (this._authService.isEmployee()) {
            this._router.navigate(['/employee']);
        }
        if (this._authService.isClient()) {
            this._router.navigate(['/client/profile']);
        }
    }

}
