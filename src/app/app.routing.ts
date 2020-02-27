import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './authorization/guards';
import {Role} from './authorization/models';
import {LoginComponent} from './authorization/login';
import {MainComponent} from './main/main.component';
import {OrderListComponent} from './order-list/order-list.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {CurrentOrderComponent} from './current-order/current-order.component';

const appRoutes: Routes = [
    {
      path: 'main',
      component: MainComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'orders',
      component: OrderListComponent,
      canActivate: [AuthGuard]
    },
    {
        path: 'statistics',
        component: StatisticsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
      path: 'current-order',
      component: CurrentOrderComponent,
      canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to main
    { path: '**', redirectTo: 'main' }
];

export const routing = RouterModule.forRoot(appRoutes);
