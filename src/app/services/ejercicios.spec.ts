import { TestBed } from '@angular/core/testing';

import { EjercicioComponent } from '../pages/suma-fracciones/ejercicio/ejercicio';


describe('Ejercicios', () => {
  let service: EjercicioComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
