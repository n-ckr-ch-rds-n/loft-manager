import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigeonDatatableComponent } from './pigeon-datatable.component';

describe('PigeonDatatableComponent', () => {
  let component: PigeonDatatableComponent;
  let fixture: ComponentFixture<PigeonDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigeonDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigeonDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
