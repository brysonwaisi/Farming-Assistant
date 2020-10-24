import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDisplayComponentComponent } from './food-display-component.component';

describe('FoodDisplayComponentComponent', () => {
  let component: FoodDisplayComponentComponent;
  let fixture: ComponentFixture<FoodDisplayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDisplayComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
