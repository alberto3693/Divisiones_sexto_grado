import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // ✅ <-- Importación agregada

import { EjercicioComponent } from './ejercicio';

describe('Ejercicio', () => {
  let component: EjercicioComponent;
  let fixture: ComponentFixture<EjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EjercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
