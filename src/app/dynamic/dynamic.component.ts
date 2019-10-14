import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    template: `
        <h1>Dynamic inserted component: {{title}}</h1>
    `
})
export class DynamicComponent {
    title = 'Default dynamic';

    constructor(route: ActivatedRoute) {
        this.title = route.snapshot.data.title ? route.snapshot.data.title : this.title;
    }
}