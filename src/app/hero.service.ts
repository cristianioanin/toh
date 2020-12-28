import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero, PowerStats } from './hero.interface';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    private readonly maxPowerStatVal: number = 11;

    constructor(private messageService: MessageService) { }

    // getHeroes(): Hero[] {
    //   return HEROES;
    // }

    getHeroes(): Observable<Hero[]> {
        this.messageService.add('HeroService: START Fetch Heroes');

        return of(HEROES).pipe(
            map((heroes: Partial<Hero>[]) => heroes.map(hero => this.assignRandomPowerStats(hero)))
        );
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
