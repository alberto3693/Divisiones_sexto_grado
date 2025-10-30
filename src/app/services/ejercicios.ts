import { Injectable } from '@angular/core';

interface Fraccion {
  numerador: number;
  denominador: number;
}

interface EjercicioRestaIgual {
  fraccion1: Fraccion;
  fraccion2: Fraccion;
  resultado: Fraccion;
  resultadoSinSimplificar: Fraccion;
}

interface EjercicioRestaDistinto {
  fraccion1: Fraccion;
  fraccion2: Fraccion;
  mcm: number;
  fraccion1Convertida: Fraccion;
  fraccion2Convertida: Fraccion;
  resultado: Fraccion;
  resultadoSinSimplificar: Fraccion;
}

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  // Función auxiliar para calcular el MCD
  private mcd(a: number, b: number): number {
    return b === 0 ? a : this.mcd(b, a % b);
  }

  // Función auxiliar para simplificar fracciones
  private simplificar(num: number, den: number): Fraccion {
    const divisor = this.mcd(Math.abs(num), Math.abs(den));
    return {
      numerador: num / divisor,
      denominador: den / divisor
    };
  }

  // SUMA DE FRACCIONES (ya existente)
  generarFraccionAleatoria() {
    const denominador = Math.floor(Math.random() * 5) + 2; // 2 a 6
    const num1 = Math.floor(Math.random() * denominador);
    const num2 = Math.floor(Math.random() * denominador);
    const resultado = `${num1 + num2}/${denominador}`;
    return {
      f1: `${num1}/${denominador}`,
      f2: `${num2}/${denominador}`,
      resultado
    };
  }

  // RESTA DE FRACCIONES - Igual denominador
  generarRestaIgualDenominador(): EjercicioRestaIgual {
    const denominador = Math.floor(Math.random() * 8) + 3; // 3 a 10
    const num1 = Math.floor(Math.random() * (denominador - 1)) + 2; // Asegura que num1 >= 2
    const num2 = Math.floor(Math.random() * num1); // num2 < num1 para resultado positivo
    
    const resultadoNum = num1 - num2;
    const simplificado = this.simplificar(resultadoNum, denominador);
    
    return {
      fraccion1: { numerador: num1, denominador },
      fraccion2: { numerador: num2, denominador },
      resultado: simplificado,
      resultadoSinSimplificar: { numerador: resultadoNum, denominador }
    };
  }

  // RESTA DE FRACCIONES - Distinto denominador
  generarRestaDistintoDenominador(): EjercicioRestaDistinto {
    const denominadores = [2, 3, 4, 5, 6, 8, 10, 12];
    const den1 = denominadores[Math.floor(Math.random() * denominadores.length)];
    let den2 = denominadores[Math.floor(Math.random() * denominadores.length)];
    
    // Asegura que los denominadores sean diferentes
    while (den2 === den1) {
      den2 = denominadores[Math.floor(Math.random() * denominadores.length)];
    }
    
    // Calcula el MCM
    const mcm = (den1 * den2) / this.mcd(den1, den2);
    
    // Genera numeradores que den un resultado positivo
    const factor1 = mcm / den1;
    const factor2 = mcm / den2;
    
    const num1 = Math.floor(Math.random() * (den1 - 1)) + 2;
    const num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
    
    // Convierte a común denominador
    const num1Convertido = num1 * factor1;
    const num2Convertido = num2 * factor2;
    
    // Asegura resultado positivo
    if (num1Convertido <= num2Convertido) {
      return this.generarRestaDistintoDenominador(); // Regenera
    }
    
    const resultadoNum = num1Convertido - num2Convertido;
    const simplificado = this.simplificar(resultadoNum, mcm);
    
    return {
      fraccion1: { numerador: num1, denominador: den1 },
      fraccion2: { numerador: num2, denominador: den2 },
      mcm,
      fraccion1Convertida: { numerador: num1Convertido, denominador: mcm },
      fraccion2Convertida: { numerador: num2Convertido, denominador: mcm },
      resultado: simplificado,
      resultadoSinSimplificar: { numerador: resultadoNum, denominador: mcm }
    };
  }

  // Genera ejercicio de resta (puede ser igual o distinto denominador)
  generarEjercicioResta(tipo: 'igual' | 'distinto' | 'aleatorio' = 'aleatorio'): EjercicioRestaIgual | EjercicioRestaDistinto {
    if (tipo === 'aleatorio') {
      tipo = Math.random() < 0.5 ? 'igual' : 'distinto';
    }
    
    return tipo === 'igual' 
      ? this.generarRestaIgualDenominador() 
      : this.generarRestaDistintoDenominador();
  }

  // Verifica si la respuesta del usuario es correcta
  verificarRespuestaResta(
    respuestaNum: number, 
    respuestaDen: number, 
    correctoNum: number, 
    correctoDen: number
  ): boolean {
    // Simplifica ambas fracciones y compara
    const respuestaSimp = this.simplificar(respuestaNum, respuestaDen);
    const correctoSimp = this.simplificar(correctoNum, correctoDen);
    
    return respuestaSimp.numerador === correctoSimp.numerador && 
           respuestaSimp.denominador === correctoSimp.denominador;
  }
}