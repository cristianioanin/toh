import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Hero, PowerStats } from '../hero.interface';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { ActiveSort, SortService } from '../sort.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {
    heroes: Hero[];
    selectedHero: Hero;

    heroes$ = merge(this.heroService.heroes$, this.sortService.sortedHeroes$).pipe(
        tap(heroes => this.heroes = heroes as Hero[])
    );

    constructor(private heroService: HeroService, private messageService: MessageService, private sortService: SortService) {
        this.heroes$.subscribe();
    }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe(heroes => {
            setTimeout(() => {
                this.heroes = heroes;
                this.messageService.add('HeroService: END Fetch Heroes');
            }, 1000);
        });
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
        this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
    }

    onUpdatePowerStats(stats: PowerStats): void {
        this.selectedHero.powerStats = stats;
        if (this.sortService.activeSort === ActiveSort.Id) {
            this.heroService.updateHeroPowerStats(this.selectedHero);
        } else {

        }
    }

    ngOnDestroy() {
    }
}
