import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';

declare var OCRAD: any;

@Component({
    template: `
        <p>main component content</p>
        <img #img src="assets/img/{{selected}}">
        <div>result: {{result}}</div>
        <a [routerLink]="['/general']">
            <button>Navigate To General Module
            </button>
        </a>
        <a [routerLink]="['/admin']">
            <button>Navigate To Admin Module
            </button>
        </a>
        <div *ngIf="loading">Loading...</div>
        <button [disabled]="loading" (click)="next()">Next</button>
        <button [disabled]="loading" (click)="ocr()">OCR</button>
        <hr>
        <router-outlet></router-outlet>
    `
})
export class MainComponent implements OnInit {

    imgs: string[] = [
        'hask.jpg', 'message.png', 'numbers.png'
    ];
    pos = 0;
    selected = this.imgs[0];
    loading = false;
    result = '';

    @ViewChild('img') img: ElementRef;

    constructor(private zone: NgZone) {
    }

    ngOnInit() {
        console.log(OCRAD.version());
    }

    next() {
        this.pos++;
        if (this.pos > 2) {
            this.pos = 0;
        }
        this.selected = this.imgs[this.pos];
    }

    ocr() {
        this.loading = true;
        // this.zone.runOutsideAngular(() => {
            OCRAD(this.img.nativeElement, (text) => {
                this.result = text;
                this.loading = false;
            });
        // });
    }
}
