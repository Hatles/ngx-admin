import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminsConfig} from '../../admin/core/adminConfig';
import {RouterModule, Routes} from '@angular/router';
import {GeneralComponent} from '../general/general.component';

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
        component: GeneralComponent,
    }
];

@NgModule({
    // imports: [AdminModule.withConfig(admins)],
    // exports: [AdminModule],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
    entryComponents: []
})
export class AdminRoutingModule {
}
