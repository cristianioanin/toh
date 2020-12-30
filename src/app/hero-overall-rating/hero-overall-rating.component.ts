import { Component, Input, OnInit } from '@angular/core';
import { PowerStats } from '../hero.interface';

enum RatingStyleValue {
    Low = 'rating--low',
    Medium = 'rating--medium',
    High = 'rating--high',
    Ultra = 'rating--ultra'
}

@Component({
    selector: 'app-hero-overall-rating',
    templateUrl: './hero-overall-rating.component.html',
    styleUrls: ['./hero-overall-rating.component.css']
})
export class HeroOverallRatingComponent implements OnInit {
    rating: number;
    ratingStyle: string;

    @Input()
    set powerStats(val: PowerStats) {
        this.rating = this.calcOverallRating(val);
        this.ratingStyle = this.evalOverallRatingStyle(this.rating);
    }

    private readonly ratingStyleGuide = {
        [RatingStyleValue.Low]: {
            style: RatingStyleValue.Low,
            min: 0,
            max: 10
        },
        [RatingStyleValue.Medium]: {
            style: RatingStyleValue.Medium,
            min: 11,
            max: 20
        },
        [RatingStyleValue.High]: {
            style: RatingStyleValue.High,
            min: 21,
            max: 30
        },
        [RatingStyleValue.Ultra]: {
            style: RatingStyleValue.Ultra,
            min: 31,
            max: 40
        }
    };

    constructor() { }

    ngOnInit(): void {
    }

    private calcOverallRating(powerStats: PowerStats): number {
        return Object.values(powerStats).reduce((acc, value) => acc + value, 0);
    }

    private evalOverallRatingStyle(rating: number): string {
        const styleGuide = Object.values(this.ratingStyleGuide).find(guide => rating >= guide.min && rating <= guide.max);

        return styleGuide.style;
    }
}
