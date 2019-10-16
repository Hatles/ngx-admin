import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminsConfig} from '../../admin/core/adminConfig';
import {RouterModule, Routes} from '@angular/router';

const admins: AdminsConfig = {
    path: 'adminconfig',
    data: {isAdminModule: true},
    component: AdminComponent,
    admins: [
        {
            name: 'test',
            actions: [
                {
                    name: 'view'
                }
            ],
            defaultActionName: 'view'
        }
    ]
};

const routes: Routes = [
    {
        path: '',
        data: {addDynamicChild: true},
        component: AdminComponent,
    }
];

@NgModule({
    // imports: [AdminModule.withConfig(admins)],
    // exports: [AdminModule],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
    declarations: [],
    entryComponents: []
})
export class AdminRoutingModule {
}
