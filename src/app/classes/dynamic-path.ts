import {Route, Routes} from '@angular/router';
import {DynamicComponent} from '../dynamic/dynamic.component';

export function addDynamicPath(config: Array<Route>, modulePath): Promise<Array<Route>> {

    return new Promise((resolve, reject) => {
        // Trigger change detection so _loadedConfig is available in router
        setTimeout(() => {
            let configIsChanged = false;
            config.forEach(root => {
                if (root.children) {
                    const foundChild: any = root.children.find(child => (child as any)._loadedConfig && child.path === modulePath);
                    if (foundChild && foundChild._loadedConfig.routes.length > 0) {
                        foundChild._loadedConfig.routes.forEach(childRoute => {
                            if (childRoute.data && childRoute.data.addDynamicChild) {
                                if (!childRoute.children) {
                                    childRoute.children = [];
                                }
                                const foundDynamicChild = childRoute.children.find(child => child.path === 'dynamic');
                                if (!foundDynamicChild) {
                                    childRoute.children.push(
                                        {
                                            path: 'dynamic',
                                            component: DynamicComponent
                                        }
                                    );
                                    configIsChanged = true;
                                }
                            }
                        });
                    }
                }
            });
            if (configIsChanged) {
                resolve(config);
            }
            resolve(null);
        }, 0);
    });
}

export function addDynamicAdmin(config: Array<Route>, modulePath): Promise<Array<Route>> {
    return addDynamicRoutes(config, modulePath, []);
}

export function addDynamicRoutes(config: Array<Route>, modulePath, routes: Routes): Promise<Array<Route>> {

    return new Promise((resolve, reject) => {
        // Trigger change detection so _loadedConfig is available in router
        setTimeout(() => {
            let configIsChanged = false;
            config.forEach(root => {
                if (root.children) {
                    const foundChild: any = root.children.find(child => (child as any)._loadedConfig && child.path === modulePath);
                    if (foundChild && foundChild._loadedConfig.routes.length > 0) {
                        foundChild._loadedConfig.routes.forEach(childRoute => {
                            if (childRoute.data && childRoute.data.isAdminModule) {
                                if (!childRoute.children) {
                                    childRoute.children = [];
                                }
                                routes.forEach(route => {
                                    const foundDynamicChild = childRoute.children.find(child => child.path === route.path);
                                    if (!foundDynamicChild) {
                                        childRoute.children.push(route);
                                        configIsChanged = true;
                                    }
                                });
                            }
                        });
                    }
                }
            });
            if (configIsChanged) {
                resolve(config);
            }
            resolve(null);
        }, 0);
    });
}
