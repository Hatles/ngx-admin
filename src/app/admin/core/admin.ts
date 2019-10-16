import {AdminConfig} from './adminConfig';
import {AdminPoolService} from './admin-pool.service';
import {Route} from '@angular/router';

export class Admin {
    constructor(private pool: AdminPoolService, private config: AdminConfig) {}

    name: string;
    route: Route;

    private buildRoute() {
        this.route = {...this.config};

        if (!this.route.children) {
            this.route.children = [];
        }

        this.route.children = [...this.config.actions, ...this.route.children];
    }

    getRoute(): Route {
        if (!this.route) {
            this.buildRoute();
        }

        return this.route;
    }
}
