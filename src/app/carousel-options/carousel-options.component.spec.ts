import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselOptionsComponent } from './carousel-options.component';

describe('CarouselOptionsComponent', () => {
  let component: CarouselOptionsComponent;
  let fixture: ComponentFixture<CarouselOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
