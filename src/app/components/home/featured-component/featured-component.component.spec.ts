import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedComponentComponent } from './featured-component.component';

describe('FeaturedComponentComponent', () => {
  let component: FeaturedComponentComponent;
  let fixture: ComponentFixture<FeaturedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
