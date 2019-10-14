import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {parseUrlPathInSegments} from '../classes/url-path-parser';

@Injectable()
export class DynamicPathGuard implements CanActivate {

    constructor(private router: Router) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const segments = parseUrlPathInSegments(state.url);
        const lastPath = segments.pop();

        if (lastPath === 'dynamic') {
            // Trigger change detection so url is known for router
            setTimeout(() => {
                this.router.navigateByUrl(state.url);
            }, 0);
        } else if (segments.some(s => s === 'admin')) {
            // Trigger change detection so url is known for router
            setTimeout(() => {
                this.router.navigateByUrl(state.url);
            }, 0);
        } else {
            this.router.navigateByUrl('/404');
        }

        return false;
    }
}
