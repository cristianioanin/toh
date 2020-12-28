import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero.interface';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    stats: Map<string, number> = new Map();

    @Input() set hero(value: Hero) {
        if (!value) {
            return;
        }

        this._hero = value;
        this.stats = new Map(Object.entries(value.powerStats));
    }

    get hero(): Hero {
        return this._hero;
    }

    private _hero: Hero = null;

    constructor() { }

    ngOnInit(): void {
    }
}
