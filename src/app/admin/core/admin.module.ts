import {APP_INITIALIZER, Injector, ModuleWithProviders, NgModule, Type} from '@angular/core';
import {AdminsConfig} from './adminConfig';
import {AdminPoolService} from './admin-pool.service';
import {Router, RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
    ],
    providers: [],
})
export class AdminModule {
    // save admin components with key for json config
    static fotRoot(): ModuleWithProviders {
        return {
            ngModule: AdminModule,
            providers: [
                AdminPoolService
            ]
        };
    }

    static withConfig(config: AdminsConfig): ModuleWithProviders {
        return {
            ngModule: AdminModule,
            providers: [
                { provide: APP_INITIALIZER, useFactory: buildConfigFactory(config), deps: [Injector, AdminPoolService], multi: true}
            ]
        };
    }

    // tslint:disable-next-line:ban-types
    static withConfigFactory(factory: AdminConfigFactory): ModuleWithProviders {
        return {
            ngModule: AdminModule,
            providers: [
                // tslint:disable-next-line:object-literal-shorthand
                { provide: APP_INITIALIZER, useFactory: buildConfigFactoryPromise(factory), deps: [Injector, AdminPoolService], multi: true}
            ]
        };
    }

    static exploreConfigForComponents(config: AdminsConfig) {
        return undefined;
    }
}

function exploreConfigForComponents(config: AdminsConfig) {
    return undefined;
}

export type AdminConfigFactory = (injector: Injector) => Promise<AdminsConfig>;

export function buildConfigFactory(config: AdminsConfig): (injector: Injector, pool: AdminPoolService) => () => Promise<any> {
    return (injector: Injector, pool: AdminPoolService) => {
        return () => new Promise(resolve => {
            buildAdmins(null, pool, config);
            resolve();
        });
    };
}

export function buildConfigFactoryPromise(factory: AdminConfigFactory): (injector: Injector, pool: AdminPoolService) => () => Promise<any> {
    return (injector: Injector, pool: AdminPoolService) => {
        return () => factory(injector).then(config => {
            buildAdmins(null, pool, config);
            return config;
        });
    };
}

export function buildAdmins(router: Router, pool: AdminPoolService, config: AdminsConfig) {
    pool.buildAdmins(router, config);
}
