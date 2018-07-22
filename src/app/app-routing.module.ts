import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {LoginRegisterGuardService} from './services/auth/login-register-guard.service';


const routes: Routes = [
    {
        path: '',
        loadChildren: './components/components.module#ComponentsModule',
        canActivate: [AuthGuardService]
    },
    { path: 'login', loadChildren: './login/login.module#LoginModule', canActivate: [LoginRegisterGuardService] },
    { path: 'register', loadChildren: './register/register.module#RegisterModule', canActivate: [LoginRegisterGuardService] },
    { path: 'unauthorized', loadChildren: './401/unauthorized.module#UnauthorizedModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
