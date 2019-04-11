import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedigreeComponent } from './pedigree.component';

describe('PedigreeComponent', () => {
  let component: PedigreeComponent;
  let fixture: ComponentFixture<PedigreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedigreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedigreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
