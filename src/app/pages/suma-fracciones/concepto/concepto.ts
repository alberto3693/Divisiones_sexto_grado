import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-concepto',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './concepto.html',
  styleUrl: './concepto.css',
})
export class Concepto {
  // Ejemplos visuales para la sección de suma
  ejemploIgualDenominador = {
    fraccion1: { numerador: 2, denominador: 7 },
    fraccion2: { numerador: 3, denominador: 7 },
    resultado: { numerador: 6, denominador: 7 }
  };

  ejemploDiferenteDenominador = {
    fraccion1: { numerador: 1, denominador: 4 },
    fraccion2: { numerador: 2, denominador: 5 },
    mcm: 20,
    fraccion1Convertida: { numerador: 5, denominador: 20 },
    fraccion2Convertida: { numerador: 8, denominador: 20 },
    resultado: { numerador: 13, denominador: 20 }
  };
}