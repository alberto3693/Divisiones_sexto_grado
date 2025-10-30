import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Fraccion {
  numerador: number;
  denominador: number;
}

interface Ejercicio {
  titulo: string;
  fracciones: Fraccion[];
  cuadros: number;
  mostrarSolucion: boolean;
  pasos?: string[];
}

@Component({
  selector: 'app-ejemplo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './ejemplo.html',
  styleUrl: './ejemplo.css',
})
export class Ejemplo {
  ejercicios: Ejercicio[] = [
    {
      titulo: 'Calcula y explica cómo lo haces. Después, representa y comprueba la suma.',
      fracciones: [
        { numerador: 2, denominador: 8 },
        { numerador: 5, denominador: 8 }
      ],
      cuadros: 8,
      mostrarSolucion: false
    },
    {
      titulo: 'Calcula y explica cómo lo haces. Después, representa y comprueba la suma.',
      fracciones: [
        { numerador: 3, denominador: 6 },
        { numerador: 5, denominador: 6 }
      ],
      cuadros: 6,
      mostrarSolucion: false
    },
    {
      titulo: 'Calcula y explica cómo lo haces. Después, representa y comprueba la suma.',
      fracciones: [
        { numerador: 4, denominador: 9 },
        { numerador: 5, denominador: 9 },
        { numerador: 7, denominador: 9 }
      ],
      cuadros: 9,
      mostrarSolucion: false
    }
  ];

  ejerciciosDiferente = [
    {
      f1: { numerador: 2, denominador: 3 },
      f2: { numerador: 3, denominador: 7 },
      mostrarSolucion: false
    },
    {
      f1: { numerador: 2, denominador: 5 },
      f2: { numerador: 2, denominador: 9 },
      mostrarSolucion: false
    },
    {
      f1: { numerador: 5, denominador: 6 },
      f2: { numerador: 3, denominador: 5 },
      mostrarSolucion: false
    },
    {
      f1: { numerador: 3, denominador: 10 },
      f2: { numerador: 7, denominador: 15 },
      mostrarSolucion: false
    },
    {
      f1: { numerador: 1, denominador: 2 },
      f2: { numerador: 4, denominador: 5 },
      mostrarSolucion: false
    },
    {
      f1: { numerador: 1, denominador: 2 },
      f2: { numerador: 4, denominador: 5 },
      f3: { numerador: 9, denominador: 10 },
      mostrarSolucion: false
    }
  ];

  toggleSolucion(index: number): void {
    this.ejercicios[index].mostrarSolucion = !this.ejercicios[index].mostrarSolucion;
  }

  toggleSolucionDiferente(index: number): void {
    this.ejerciciosDiferente[index].mostrarSolucion = !this.ejerciciosDiferente[index].mostrarSolucion;
  }

  calcularMCM(a: number, b: number): number {
    const mcd = (x: number, y: number): number => y === 0 ? x : mcd(y, x % y);
    return (a * b) / mcd(a, b);
  }

  calcularSumaIgual(fracciones: Fraccion[]): Fraccion {
    const sumaNum = fracciones.reduce((sum, f) => sum + f.numerador, 0);
    return { numerador: sumaNum, denominador: fracciones[0].denominador };
  }

  calcularSumaDiferente(f1: Fraccion, f2: Fraccion): any {
    const mcm = this.calcularMCM(f1.denominador, f2.denominador);
    const num1 = (f1.numerador * mcm) / f1.denominador;
    const num2 = (f2.numerador * mcm) / f2.denominador;
    return {
      mcm,
      f1Conv: { numerador: num1, denominador: mcm },
      f2Conv: { numerador: num2, denominador: mcm },
      resultado: { numerador: num1 + num2, denominador: mcm }
    };
  }

  generarCuadros(cantidad: number): number[] {
    return Array(cantidad).fill(0).map((_, i) => i);
  }
}