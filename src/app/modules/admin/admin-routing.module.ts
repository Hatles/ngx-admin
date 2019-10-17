import {NgModule, Type} from '@angular/core';
import {AdminsConfig} from '../../admin/core/adminConfig';
import {AdminModule} from '../../admin/core/admin.module';
import {AdminRootComponent} from './components/admin-root/admin-root.component';
import {AdminBaseComponent} from './components/admin-base/admin-base.component';
import {AdminActionBaseComponent} from './components/admin-action-base/admin-action-base.component';
import {AdminDashboardBaseComponent} from './components/admin-dashboard-base/admin-dashboard-base.component';
import {AdminPoolService} from '../../admin/core/admin-pool.service';
import {RouteConfigLoadEnd, Router} from '@angular/router';

const adminComponents: Type<any>[] = [
    AdminRootComponent,
    AdminDashboardBaseComponent,
    AdminBaseComponent,
    AdminActionBaseComponent
];

const admins: AdminsConfig = {
    path: 'adminconfig',
    data: {},
    component: AdminRootComponent,
    admins: [
        // {
        //     name: 'dashboard',
        //     path: '',
        //     component: AdminDashboardBaseComponent
        // },
        // {
        //     name: 'test',
        //     path: 'test',
        //     component: AdminBaseComponent,
        //     actions: [
        //         {
        //             name: 'view',
        //             path: 'view',
        //             component: AdminActionBaseComponent
        //         }
        //     ],
        //     defaultActionName: 'view'
        // }
    ]
};

@NgModule({
    // imports: [AdminModule.withConfig(admins)],
    // exports: [AdminModule],
    // imports: [AdminModule.withConfig(admins)],
    imports: [AdminModule],
    exports: [AdminModule],
    providers: [],
    declarations: [adminComponents],
    entryComponents: [adminComponents]
})
export class AdminRoutingModule {
    constructor(private router: Router, pool: AdminPoolService) {
        this.router.events.subscribe(async routerEvent => {

            if (routerEvent instanceof RouteConfigLoadEnd) {
                pool.buildAdmins(router, admins);
            }
        });
    }
}
