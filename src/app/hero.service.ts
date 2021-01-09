import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero, PowerStats } from './hero.interface';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    private readonly maxPowerStatVal: number = 11;

    heroes$ = new BehaviorSubject<Hero[] | Partial<Hero>[]>([]);

    constructor(private messageService: MessageService) { }

    // getHeroes(): Hero[] {
    //   return HEROES;
    // }

    getHeroes(): Observable<Hero[]> {
        this.messageService.add('HeroService: START Fetch Heroes');

        return of(HEROES).pipe(
            map((data: Partial<Hero>[]) => {
                const heroes = data.map(hero => this.assignRandomPowerStats(hero));

                this.heroes$.next(heroes);

                return heroes as Hero[];
            }));
    }

    updateHeroPowerStats(selectedHero: Hero): void {
        const heroes = JSON.parse(JSON.stringify(this.heroes$.getValue())).map((hero: Hero) => {
            if (hero.id === selectedHero.id) {
                return {
                    ...hero,
                    powerStats: selectedHero.powerStats,
                    overallRating: Object.values(selectedHero.powerStats).reduce((a, b) => a + b, 0)
                };
            }

            return hero;
        });

        this.heroes$.next(heroes);
    }

    private assignRandomPowerStats(hero: Partial<Hero>): Hero {
        const powerStats: PowerStats = {
            combat: this.getRandomPowerStatValue(),
            speed: this.getRandomPowerStatValue(),
            intelligence: this.getRandomPowerStatValue(),
            strength: this.getRandomPowerStatValue(),
        };

        return {
            ...hero,
            powerStats
        } as Hero;
    }

    private getRandomPowerStatValue(): number {
        return Math.floor(Math.random() * this.maxPowerStatVal);
    }
}
