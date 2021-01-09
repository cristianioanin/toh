import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero.interface';
import { HeroService } from '../hero.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    // @Input() hero: Hero;
    hero$ = this.heroService.selectedHero$;
    hero: Hero;

    subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ) {
        // BehaviorSubject use case #1
        // this.hero$.subscribe(selectedHero => this.hero = selectedHero);

        this.subscription = this.hero$.subscribe(selectedHero => this.hero = selectedHero);
    }


    ngOnInit(): void {
        // this.getHero();
        console.log('ON INIT: ',);
        this.setSelectedHero();
        // console.log('route: ', this.route);
        // console.log('location: ', this.location);
    }

    // getHero(): void {
    //     const id = +this.route.snapshot.paramMap.get('id');
    //     this.heroService.getHero(id)
    //         .subscribe(hero => this.hero = hero);
    // }

    setSelectedHero(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.heroService.updateSelectedHero(id);
    }

    goBack(): void {
        this.location.back();
    }

    getSelectedHero() {
        // BehaviorSubject use case #2
        console.log(this.hero$.getValue());
    }

    dispose(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngOnDestroy(): void {
        console.log('ON DESTROY: ',);
        // Unsubscribe #1
        this.dispose();
    }
}
