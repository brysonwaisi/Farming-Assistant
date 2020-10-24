import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListComponentComponent } from './food-list-component.component';

describe('FoodListComponentComponent', () => {
  let component: FoodListComponentComponent;
  let fixture: ComponentFixture<FoodListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
