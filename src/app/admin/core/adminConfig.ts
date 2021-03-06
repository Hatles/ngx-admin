import {Route} from '@angular/router';
import {AdminAction} from './adminAction';

export type RouteFinder = (Route) => boolean;

export interface AdminsConfig extends Route {
    admins: AdminConfig[];
    rootFinder?: RouteFinder;
    defaultRoute?: Route;
    defaultRoutePath?: string;
    defaultAdminName?: string;
    wildcardRoute?: Route;
    wildcardRedirectToAdminRoot?: boolean;
}

export interface AdminConfig extends Route {
    name: string;
    defaultActionName?: string;
    actions?: AdminAction[];
}
