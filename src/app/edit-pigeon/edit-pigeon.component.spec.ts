import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPigeonComponent } from './edit-pigeon.component';

describe('EditPigeonComponent', () => {
  let component: EditPigeonComponent;
  let fixture: ComponentFixture<EditPigeonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPigeonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPigeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
