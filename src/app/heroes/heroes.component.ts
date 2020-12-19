import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../hero.interface';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(private heroService: HeroService, private messageService: MessageService) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe(heroes => {
            setTimeout(() => {
              this.heroes = heroes;
              this.messageService.add('HeroService: END Fetch Heroes');
            }, 3000);
        });
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
        this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
    }

    ngOnDestroy() {
    }
}
