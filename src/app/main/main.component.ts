import {Component, OnInit} from '@angular/core';

@Component({
    template: `
        <p>main component content</p>
        <a [routerLink]="['/general']">
            <button>Navigate To General Module
            </button>
        </a>
        <a [routerLink]="['/admin']">
            <button>Navigate To Admin Module
            </button>
        </a>
        <a [routerLink]="['/adminconfig']">
            <button>Navigate To Admin Module
            </button>
        </a>
        <hr>
        <router-outlet></router-outlet>
    `
})
export class MainComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
