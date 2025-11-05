import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Fraccion {
  numerador: number;
  denominador: number;
}

@Component({
  selector: 'app-suma-fracciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ejemplo.html',
  styleUrls: ['./ejemplo.css']
})
export class Ejemplo {
  // Fracciones de entrada
  f1: Fraccion = {
    numerador: 1,
    denominador: 4
  };

  f2: Fraccion = {
    numerador: 1,
    denominador: 2
  };

  // Resultado
  resultado: Fraccion | null = null;

  /**
   * Calcula el Máximo Común Divisor (MCD) usando el algoritmo de Euclides
   */
  private calcularMCD(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    
    return a;
  }

  /**
   * Calcula el Mínimo Común Múltiplo (MCM)
   */
  private calcularMCM(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / this.calcularMCD(a, b);
  }

  /**
   * Simplifica una fracción dividiéndola por su MCD
   */
  private simplificarFraccion(numerador: number, denominador: number): Fraccion {
    if (denominador === 0) {
      return { numerador: 0, denominador: 1 };
    }

    const mcd = this.calcularMCD(numerador, denominador);
    
    return {
      numerador: numerador / mcd,
      denominador: denominador / mcd
    };
  }

  /**
   * Valida que las fracciones tengan valores correctos
   */
  private validarFracciones(): boolean {
    // Validar que los denominadores no sean cero
    if (this.f1.denominador === 0 || this.f2.denominador === 0) {
      alert('⚠️ El denominador no puede ser cero.');
      return false;
    }

    // Validar que los denominadores sean positivos
    if (this.f1.denominador < 0 || this.f2.denominador < 0) {
      alert('⚠️ Los denominadores deben ser números positivos.');
      return false;
    }

    // Validar que los numeradores no sean negativos
    if (this.f1.numerador < 0 || this.f2.numerador < 0) {
      alert('⚠️ Los numeradores deben ser números positivos para esta visualización.');
      return false;
    }

    // Validar límites razonables para la visualización
    if (this.f1.denominador > 20 || this.f2.denominador > 20) {
      alert('⚠️ Para una mejor visualización, usa denominadores menores o iguales a 20.');
      return false;
    }

    if (this.f1.numerador > this.f1.denominador * 2 || this.f2.numerador > this.f2.denominador * 2) {
      alert('⚠️ Para una mejor visualización, el numerador no debe ser más del doble del denominador.');
      return false;
    }

    return true;
  }

  /**
   * Calcula la suma de las dos fracciones
   */
  calcular(): void {
    // Validar las fracciones antes de calcular
    if (!this.validarFracciones()) {
      return;
    }

    // Encontrar el MCM de los denominadores
    const mcm = this.calcularMCM(this.f1.denominador, this.f2.denominador);

    // Ajustar los numeradores según el nuevo denominador común
    const numerador1Ajustado = this.f1.numerador * (mcm / this.f1.denominador);
    const numerador2Ajustado = this.f2.numerador * (mcm / this.f2.denominador);

    // Sumar los numeradores ajustados
    const numeradorSuma = numerador1Ajustado + numerador2Ajustado;

    // Simplificar el resultado
    this.resultado = this.simplificarFraccion(numeradorSuma, mcm);

    // Mostrar en consola los pasos (útil para debugging)
    console.log('Paso 1 - MCM:', mcm);
    console.log('Paso 2 - Numerador 1 ajustado:', numerador1Ajustado);
    console.log('Paso 2 - Numerador 2 ajustado:', numerador2Ajustado);
    console.log('Paso 3 - Suma de numeradores:', numeradorSuma);
    console.log('Resultado simplificado:', this.resultado);
  }

  /**
   * Genera un array para iterar en el template y crear las figuras visuales
   */
  generarCuadros(cantidad: number): number[] {
    return Array(cantidad).fill(0).map((_, i) => i);
  }

  /**
   * Reinicia los valores a los predeterminados
   */
  reiniciar(): void {
    this.f1 = { numerador: 1, denominador: 4 };
    this.f2 = { numerador: 1, denominador: 2 };
    this.resultado = null;
  }
}