import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Hero } from './hero.interface';
import { HeroService } from './hero.service';

export enum ActiveSort {
    Id,
    Rating
}

@Injectable({
    providedIn: 'root'
})
export class SortService {
    private heroes: Hero[];
    private sortedHeroes: Hero[];

    private heroes$ = this.heroesService.heroes$.asObservable().pipe(
        filter((data: Hero[]) => !!data.length),
        map(heroes => this.initOverallRating(heroes)),
        tap(heroes => this.heroes = heroes)
    );

    activeSort: ActiveSort;

    sortedHeroes$ = new Subject<Hero[]>();

    constructor(private heroesService: HeroService) {
        this.heroes$.subscribe();
    }

    sortById(): void {
        const sorted = this.cloneDeepHeroes().sort((a, b) => a.id - b.id);

        this.sortedHeroes$.next(sorted);
        this.sortedHeroes = sorted;
        this.activeSort = ActiveSort.Id;
    }

    sortByOverallRating(): void {
        const sorted = this.cloneDeepHeroes().sort((a, b) => a.overallRating - b.overallRating);

        this.sortedHeroes$.next(sorted);
        this.sortedHeroes = sorted;
        this.activeSort = ActiveSort.Rating;
    }

    updateHeroPowerStats(selectedHero: Hero): void {
        const heroes = JSON.parse(JSON.stringify(this.sortedHeroes)).map((hero: Hero) => {
            if (hero.id === selectedHero.id) {
                return {
                    ...hero,
                    powerStats: selectedHero.powerStats,
                    overallRating: Object.values(selectedHero.powerStats).reduce((a, b) => a + b, 0)
                };
            }

            return hero;
        });

        this.sortedHeroes$.next(heroes);
    }

    private cloneDeepHeroes(): Hero[] {
        return JSON.parse(JSON.stringify(this.heroes));
    }

    private initOverallRating(heroes: Hero[]): Hero[] {
        return heroes.map(hero => {
            if (!hero.overallRating) {
                const overallRating = Object.values(hero.powerStats).reduce((a, b) => a + b, 0);

                return {
                    ...hero,
                    overallRating
                };
            }

            return hero;
        });
    }
}
