import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin-root',
    templateUrl: './admin-root.component.html',
    styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit {

    constructor(router: Router) {
        console.log(router.config);
    }

    ngOnInit() {
    }

}
