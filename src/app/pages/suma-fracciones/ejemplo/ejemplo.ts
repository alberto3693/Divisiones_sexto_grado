import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Fraccion {
  numerador: number;
  denominador: number;
}

@Component({
  selector: 'app-ejemplo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ejemplo.html',
  styleUrls: ['./ejemplo.css']
})
export class Ejemplo {
  f1: Fraccion = { numerador: 1, denominador: 2 };
  f2: Fraccion = { numerador: 1, denominador: 3 };
  resultado: Fraccion | null = null;

  calcularMCM(a: number, b: number): number {
    const mcd = (x: number, y: number): number => (y === 0 ? x : mcd(y, x % y));
    return (a * b) / mcd(a, b);
  }

  calcular(): void {
    if (!this.f1.denominador || !this.f2.denominador) return;

    const mcm = this.calcularMCM(this.f1.denominador, this.f2.denominador);
    const num1 = (this.f1.numerador * mcm) / this.f1.denominador;
    const num2 = (this.f2.numerador * mcm) / this.f2.denominador;

    this.resultado = {
      numerador: num1 + num2,
      denominador: mcm
    };
  }

  generarCuadros(cantidad: number): number[] {
    return Array.from({ length: cantidad }, (_, i) => i);
  }
}
