/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminComponent} from './admin.component';

const routes: Routes = [
    {
        path: '',
        data: {isAdminModule: true},
        component: AdminComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule {
}
