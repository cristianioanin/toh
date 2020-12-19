import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero.interface';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    constructor(private messageService: MessageService) { }

    // getHeroes(): Hero[] {
    //   return HEROES;
    // }

    getHeroes(): Observable<Hero[]> {
      this.messageService.add('HeroService: START Fetch Heroes');

      return of(HEROES);
    }
}
