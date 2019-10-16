import {Injectable, Injector} from '@angular/core';
import {AdminConfig, AdminsConfig} from './adminConfig';
import {Route, Router} from '@angular/router';
import {Admin} from './admin';

export interface AdminWithConfig {
    admin: Admin;
    config: AdminConfig;
}

@Injectable({providedIn: 'root'})
export class AdminPoolService {

    private adminsConfig: AdminsConfig;
    private admins: AdminWithConfig[];
    private router: Router;

    constructor(private injector: Injector) {
    }

    buildAdmins(router: Router, adminsConfig: AdminsConfig) {
        this.admins = [];
        this.adminsConfig = adminsConfig;
        const admins = adminsConfig.admins.map((admin) => this.buildAdmin(admin));
        const adminRoutes = admins.map(admin => this.buildAdminRoute(admin));

        this.buildAdminsRoute(adminRoutes);
    }

    buildAdmin(config: AdminConfig): Admin {
        const admin = new Admin(this, config);
        this.admins.push({
            admin: admin,
            config: config
        });

        return admin;
    }

    buildAdminRoute(admin: Admin): Route {
        return admin.getRoute();
    }

    getAdmin(admin: string) {
        return this.getAdminWithConfig(admin).admin;
    }

    getAdminConfig(admin: string) {
        return this.getAdminWithConfig(admin).config;
    }

    getAdminWithConfig(admin: string) {
        return this.admins.find(a => a.config.name === admin);
    }

    private buildAdminsRoute(adminRoutes: Route[]) {
        const route = this.adminsConfig;

        if (!route.children) {
            route.children = [];
        }

        route.children = [...adminRoutes, ...route.children];

        this.router = this.injector.get(Router);
        const routerConfig = [route, ...this.router.config];
        this.router.resetConfig(routerConfig);
    }
}
