import {Component} from '@angular/core';

@Component({
    template: `
        <p>general component content</p>
        <a [routerLink]="['dyn1']">
            <button>Navigate To Dynamic 1 child page
            </button>
        </a>
        <a [routerLink]="['dyn2']">
            <button>Navigate To Dynamic 2 child page
            </button>
        </a>
        <hr>
        <router-outlet></router-outlet>
    `
})
export class AdminComponent {
}
