import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './authorization/home';
import {AuthGuard} from './authorization/guards';
import {AdminComponent} from './authorization/admin';
import {Role} from './authorization/models';
import {LoginComponent} from './authorization/login';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
