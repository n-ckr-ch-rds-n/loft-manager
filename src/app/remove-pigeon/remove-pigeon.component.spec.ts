import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePigeonComponent } from './remove-pigeon.component';

describe('RemovePigeonComponent', () => {
  let component: RemovePigeonComponent;
  let fixture: ComponentFixture<RemovePigeonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovePigeonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePigeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
