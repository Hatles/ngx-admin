import {Route} from '@angular/router';
import {AdminAction} from './adminAction';

export interface AdminsConfig extends Route {
    admins: AdminConfig[];
    rootPath?: string;
}

export interface AdminConfig extends Route {
    name: string;
    defaultActionName: string;
    actions: AdminAction[];
}
