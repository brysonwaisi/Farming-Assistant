import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemComponentComponent } from './food-item-component.component';

describe('FoodItemComponentComponent', () => {
  let component: FoodItemComponentComponent;
  let fixture: ComponentFixture<FoodItemComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodItemComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
