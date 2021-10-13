import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'bdo-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
    public isHome = true;
    public navigated = false;
    constructor(private location: Location,
                private router: Router) {}

    ngOnInit(): void {
        this.isHome = this.router.url === '/home';
        this.router.events.subscribe(() => {
            this.isHome = this.router.url === '/home';
            this.navigated = true;
        });
    }

    back() {
        if (this.navigated) {
            this.location.back();
        } else {
            this.router.navigate(['/home'])
        }
    }
}
