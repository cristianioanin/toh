import { Component, OnInit } from '@angular/core';
import { SortService } from '../sort.service';

@Component({
    selector: 'app-heroes-sort',
    templateUrl: './heroes-sort.component.html',
    styleUrls: ['./heroes-sort.component.css']
})
export class HeroesSortComponent implements OnInit {

    constructor(public sortService: SortService) { }

    ngOnInit(): void {
    }

}
