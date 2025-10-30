import { EjercicioResta } from './../ejercicio/ejercicio';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EjerciciosService } from '../../../services/ejercicios';



@Component({
  selector: 'app-ejemplo-resta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ejemplo.html',
  styleUrls: ['./ejemplo.css']
})
export class Ejemploresta {
  ejemploActual: any;
  pasoActual: number = 0;
  tipoEjemplo: 'igual' | 'distinto' = 'igual';

  constructor(private ejerciciosService: EjerciciosService) {
    this.generarNuevoEjemplo();
  }

  generarNuevoEjemplo() {
    this.pasoActual = 0;
    this.ejemploActual = this.ejerciciosService.generarEjercicioResta(this.tipoEjemplo);
  }

  siguientePaso() {
    const maxPasos = this.tipoEjemplo === 'igual' ? 3 : 5;
    if (this.pasoActual < maxPasos) {
      this.pasoActual++;
    }
  }

  pasoAnterior() {
    if (this.pasoActual > 0) {
      this.pasoActual--;
    }
  }

  cambiarTipo(tipo: 'igual' | 'distinto') {
    this.tipoEjemplo = tipo;
    this.generarNuevoEjemplo();
  }

  get totalPasos(): number {
    return this.tipoEjemplo === 'igual' ? 3 : 5;
  }

  generarCuadricula(numerador: number, denominador: number): boolean[] {
    return Array(denominador).fill(false).map((_, i) => i < numerador);
  }
}