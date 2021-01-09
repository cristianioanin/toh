import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesSortComponent } from './heroes-sort.component';

describe('HeroesSortComponent', () => {
  let component: HeroesSortComponent;
  let fixture: ComponentFixture<HeroesSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
