import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-concepto-resta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './concepto.html',
  styleUrls: ['./concepto.css']
})
export class Conceptoresta {
  ejemploPina = {
    fraccion1: { numerador: 7, denominador: 10 },
    fraccion2: { numerador: 3, denominador: 10 },
    resultado: { numerador: 4, denominador: 10 }
  };

  ejemploNaranja = {
    fraccion1: { numerador: 3, denominador: 4 },
    fraccion2: { numerador: 1, denominador: 5 },
    mcm: 20,
    fraccion1Equiv: { numerador: 15, denominador: 20 },
    fraccion2Equiv: { numerador: 4, denominador: 20 },
    resultado: { numerador: 11, denominador: 20 }
  };

  generarCuadricula(numerador: number, denominador: number): boolean[] {
    const total = denominador;
    const llenos = numerador;
    return Array(total).fill(false).map((_, i) => i < llenos);
  }
}