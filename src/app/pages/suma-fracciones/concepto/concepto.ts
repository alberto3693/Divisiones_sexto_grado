import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Fraccion {
  numerador: number;
  denominador: number;
}

interface EjemploHuerto {
  tomates: Fraccion;
  pimientos: Fraccion;
  zanahorias: Fraccion;
  flores: Fraccion;
  cesped: Fraccion;
  resultadoHuerta: Fraccion;
  resultadoJardin: Fraccion;
  mcmJardin: number;
}

@Component({
  selector: 'app-concepto',
  templateUrl: './concepto.html',
  styleUrls: ['./concepto.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class Concepto implements OnInit {
  ejemplo!: EjemploHuerto;
  mostrarReferencias = false;

  ngOnInit() {
    this.generarEjemploAleatorio();
  }

  generarEjemploAleatorio() {
    // Generar ejemplo de la huerta (mismo denominador)
    const denominadorHuerta = this.obtenerDenominadorAleatorio([7, 8, 9, 10, 12]);
    
    // Generar tres numeradores que sumen menos que el denominador
    const numeradores = this.generarNumeradoresQueNoExcedan(denominadorHuerta, 3);
    
    const tomates: Fraccion = { numerador: numeradores[0], denominador: denominadorHuerta };
    const pimientos: Fraccion = { numerador: numeradores[1], denominador: denominadorHuerta };
    const zanahorias: Fraccion = { numerador: numeradores[2], denominador: denominadorHuerta };
    
    const sumaHuerta = numeradores.reduce((a, b) => a + b, 0);
    const resultadoHuerta: Fraccion = { numerador: sumaHuerta, denominador: denominadorHuerta };

    // Generar ejemplo del jardín (diferente denominador)
    const paresComunes = [
      [3, 4], [2, 5], [3, 5], [2, 7], [3, 7], 
      [4, 5], [5, 6], [3, 8], [5, 8]
    ];
    const parSeleccionado = paresComunes[Math.floor(Math.random() * paresComunes.length)];
    
    const denJardin1 = parSeleccionado[0];
    const denJardin2 = parSeleccionado[1];
    
    // Generar numeradores que no excedan el MCM
    const mcm = this.calcularMCM(denJardin1, denJardin2);
    const numJardin1 = Math.floor(Math.random() * (denJardin1 - 1)) + 1;
    const numJardin2 = Math.floor(Math.random() * (denJardin2 - 1)) + 1;
    
    // Verificar que la suma no exceda 1
    const suma1 = (numJardin1 * mcm / denJardin1);
    const suma2 = (numJardin2 * mcm / denJardin2);
    
    const flores: Fraccion = { numerador: numJardin1, denominador: denJardin1 };
    const cesped: Fraccion = { numerador: numJardin2, denominador: denJardin2 };
    
    const resultadoJardin: Fraccion = {
      numerador: suma1 + suma2,
      denominador: mcm
    };

    this.ejemplo = {
      tomates,
      pimientos,
      zanahorias,
      flores,
      cesped,
      resultadoHuerta,
      resultadoJardin,
      mcmJardin: mcm
    };
  }

  private obtenerDenominadorAleatorio(opciones: number[]): number {
    return opciones[Math.floor(Math.random() * opciones.length)];
  }

  private generarNumeradoresQueNoExcedan(denominador: number, cantidad: number): number[] {
    const numeradores: number[] = [];
    const maxSuma = denominador - 1;
    
    for (let i = 0; i < cantidad - 1; i++) {
      const sumaActual = numeradores.reduce((a, b) => a + b, 0);
      const restante = maxSuma - sumaActual;
      const max = Math.min(restante - (cantidad - i - 1), Math.floor(denominador / 2));
      const num = Math.floor(Math.random() * max) + 1;
      numeradores.push(num);
    }
    
    const sumaActual = numeradores.reduce((a, b) => a + b, 0);
    const ultimo = Math.min(Math.floor(Math.random() * (maxSuma - sumaActual)) + 1, maxSuma - sumaActual);
    numeradores.push(ultimo);
    
    return numeradores;
  }

  private calcularMCM(a: number, b: number): number {
    return (a * b) / this.calcularMCD(a, b);
  }

  private calcularMCD(a: number, b: number): number {
    return b === 0 ? a : this.calcularMCD(b, a % b);
  }

  calcularFraccionEquivalente(fraccion: Fraccion, nuevoDenominador: number): Fraccion {
    const factor = nuevoDenominador / fraccion.denominador;
    return {
      numerador: fraccion.numerador * factor,
      denominador: nuevoDenominador
    };
  }

  toggleReferencias() {
    this.mostrarReferencias = !this.mostrarReferencias;
  }

  nuevoEjemplo() {
    this.generarEjemploAleatorio();
  }
}