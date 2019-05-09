import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigeonFormComponent } from './pigeon-form.component';

describe('PigeonFormComponent', () => {
  let component: PigeonFormComponent;
  let fixture: ComponentFixture<PigeonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigeonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigeonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
