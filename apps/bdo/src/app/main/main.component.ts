import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../shared/services/filter.service';
import { Location } from '@angular/common';

@Component({
    selector: 'bdo-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
    public isHome = true;
    public navigated = false;
    constructor(
        private location: Location,
        private filterService: FilterService,
        private router: Router) {}

    ngOnInit(): void {
        this.isHome = this.router.url === '/home';
        this.router.events.subscribe(() => {
            this.isHome = this.router.url === '/home';
            this.navigated = true;
        });
    }

    navigateToSearch() {
        this.router.navigate(['/search']);
    }

    back() {
        if (this.filterService.isOpen()) {
            this.filterService.closeFilter();
            return;
        }

        if (this.navigated) {
            this.location.back();
        } else {
            this.router.navigate(['/home'])
        }
    }
}
