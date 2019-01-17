import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigeonDetailsComponent } from './pigeon-details.component';

describe('PigeonDetailsComponent', () => {
  let component: PigeonDetailsComponent;
  let fixture: ComponentFixture<PigeonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigeonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigeonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
