import { Component, EventEmitter, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFormsManager } from '@ngneat/forms-manager';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Hero, PowerStats } from '../hero.interface';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    @Input() set hero(value: Hero) {
        if (!value) {
            return;
        }

        this._hero = value;
        this.stats = new Map(Object.entries(value.powerStats));
        this.formsManager.patchValue(this.formName, value.powerStats);
    }
    get hero(): Hero {
        return this._hero;
    }

    @Output()
    updatePowerStats = new EventEmitter<PowerStats>();

    private _hero: Hero = null;
    private unsubscribe$ = new Subject<void>();
    private readonly formControlConfig = [null, [Validators.min(0), Validators.max(10)]];
    private readonly formName = 'powerStatsForm';

    stats: Map<string, number> = new Map();
    powerStatsForm: FormGroup;
    statsValue$ = this.formsManager.valueChanges(this.formName).pipe(
        filter((stats: PowerStats) => Object.values(stats).every(stat => stat !== null)),
        takeUntil(this.unsubscribe$),
        tap((stats: PowerStats) => this.updatePowerStats.emit(stats))
    );

    constructor(
        private formBuilder: FormBuilder,
        private formsManager: NgFormsManager
    ) {
        this.powerStatsForm = this.formBuilder.group({
            combat: this.formControlConfig,
            speed: this.formControlConfig,
            intelligence: this.formControlConfig,
            strength: this.formControlConfig
        });

        this.formsManager.upsert(this.formName, this.powerStatsForm);
        this.statsValue$.subscribe();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.formsManager.unsubscribe(this.formName);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
