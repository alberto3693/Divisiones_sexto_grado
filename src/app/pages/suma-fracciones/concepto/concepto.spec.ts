import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Concepto } from './concepto';

describe('Concepto', () => {
  let component: Concepto;
  let fixture: ComponentFixture<Concepto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Concepto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Concepto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
