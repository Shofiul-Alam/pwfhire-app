import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Employee} from '../../models/DataModel/Employee';
import {ValidationService} from '../../services/form/formValidation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from '../../services/RegisterService/register.service';
import {LoginService} from '../../services/login.service';
import {AuthRequest} from '../../models/AuthRequest';
import {User} from '../../models/DataModel/User';
import {Page} from '../../models/ViewModel/Page';
import {AuthResponse} from '../../models/AuthResponse';
import {AccessLevel} from '../../models/ServiceModel/AccessLevel';
import {AuthService} from '../../services/auth/auth.service';
import {Response} from '../../models/ServiceModel/Response';
import {EmployeeRequest} from '../../models/DataModel/DataRequestModel/EmployeeRequest';
import {ErrorResponse} from '../../models/ServiceModel/ErrorResponse';

declare var $: any;

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {

    /** My Code execute from here **/
    private authRequest: AuthRequest = new AuthRequest();
    public authentication: AuthResponse = new AuthResponse();
    public accessLevel: AccessLevel = new AccessLevel();
    private page: Page = new Page();
    public checkboxTerm = false;
    public user: User;
    public employee: EmployeeRequest;
    public employeeResponse:  Employee;
    public error: ErrorResponse;

    constructor(
        private validationForm: ValidationService,
        private _registerService: RegisterService,
        private _loginService: LoginService,
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {
        this.page.title = 'Register';
        this.employee = new EmployeeRequest();
        this.user = new User();
        this.employeeResponse = new Employee();
        this.error = new ErrorResponse();
    }

    ngAfterViewInit() {
        $(function() {
            $('.preloader').fadeOut();
        });
    }

    ngOnInit() {
        this.validationForm.floatLabel();
    }

    onSubmit() {
        this.page.loader = true;
        this._registerService.userRegister(this.user).subscribe(
            response => {
                const userRes: Response = new Response();
                Object.assign(userRes, response);
                Object.assign(this.user, userRes.data);
                this.authRequest.username = this.user.email;
                this.authRequest.password = this.user.password;
                this.authRequest.grant_type = 'password';
                this._loginService.login(this.authRequest).subscribe(
                res => {
                        Object.assign(this.authentication, res);
                        localStorage.setItem('access_token', this.authentication.access_token);
                        this._registerService.employeeRegister(this.employee).subscribe(
                            responseEmployee => {
                                const empRes: Response = new Response();
                                Object.assign(empRes, responseEmployee);
                                Object.assign(this.employeeResponse, empRes.data);
                                this.page.cssClass = Page.SUCCESS;
                                this.page.message = '!!! ' + this.employeeResponse.firstName + ' has been successfully registered.';
                                this.setAccessLevel();
                            },
                            error => {
                                this.page.loader = false;
                                Object.assign(this.error, error.error);
                                this.errorHandler(this.error);
                            }
                        );
                    },
                    error => {
                        this.page.loader = false;
                        console.log(error.error);
                        console.log(<any> error);
                    }
                );
            },
            error => {
                this.page.loader = false;
                Object.assign(this.error, error.error);
                this.errorHandler(this.error);
            }
        );
    }

    cancelPopUp() {
        this.page.message = 0;
    }

    setAccessLevel() {
        this._loginService.accessLevel().subscribe(
            res => {
                this.page.message = 0;
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
    }


    afterLoginRedirect(returnUrl) {
        if (this._authService.isEmployee()) {
            this._router.navigate(['/employee']);
        }
        if (this._authService.isClient()) {
            this._router.navigate(['/client/profile']);
        }
    }

    errorHandler(error: ErrorResponse) {
        if (this.error.error) {
            for (const errItem in error.error) {
                if (error.error.hasOwnProperty(errItem)) {
                    for (const err of error.error[errItem]) {
                            document.getElementById(errItem).innerHTML = err;
                    }
                }
            }
        }
    }

}
