import {NgModule} from '@angular/core';
import {PreloadAllModules, RouteConfigLoadEnd, Router, RouterModule, Routes} from '@angular/router';
import {addDynamicPath, addDynamicRoutes} from './classes/dynamic-path';
import {NotFoundComponent} from './notfound/not-found.component';
import {DynamicPathGuard} from './guards/dynamic-path.guard';
import {MainComponent} from './main/main.component';
import {DynamicComponent} from './dynamic/dynamic.component';
import {AdminModule} from './admin/core/admin.module';
import {AdminComponent} from './modules/admin/admin.component';
import {dataRouteFinder} from './admin/core/dataRouteFinder';

const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            // {path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
            {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
        ]
    },
    {path: 'dyn/:id', component: NotFoundComponent},
    {path: '404', component: NotFoundComponent},
    {path: '**', canActivate: [DynamicPathGuard], component: NotFoundComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                preloadingStrategy: PreloadAllModules
            }
        ),
        AdminModule.fotRoot(),
        AdminModule.withConfig({
            rootFinder: dataRouteFinder('adminRoot'),
            path: 'adminroot',
            data: {title: 'test'},
            component: DynamicComponent,
            admins: [
                // {
                //     name: 'test',
                //     path: 'test',
                //     actions: [
                //         {
                //             name: 'view'
                //         }
                //     ],
                //     defaultActionName: 'view'
                // }
            ],
            // defaultAdminName: 'test',
            wildcardRedirectToAdminRoot: true
        }),
    ],
    exports: [RouterModule],
    declarations: [DynamicComponent],
    entryComponents: [DynamicComponent]
})
export class AppRoutingModule {

    constructor(private router: Router) {

        this.router.events.subscribe(async routerEvent => {

            if (routerEvent instanceof RouteConfigLoadEnd) {
                addDynamicPath(this.router.config, routerEvent.route.path);
                addDynamicRoutes(this.router.config, routerEvent.route.path, [
                    {
                        path: 'dyn1',
                        component: DynamicComponent,
                        data: {
                            title: 'dynamic 1'
                        }
                    },
                    {
                        path: 'dyn2',
                        component: DynamicComponent,
                        data: {
                            title: 'dynamic 2'
                        }
                    }
                ]);
                // Don't reset the router, if you deeplink the next navigation
                // will act as full page refresh when router is reset
                // if (newConfig) {
                //   this.router.resetConfig(newConfig);
                // }
            }
        });
    }
}
