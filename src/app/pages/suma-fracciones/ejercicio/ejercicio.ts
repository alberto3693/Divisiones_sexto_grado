import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Fraccion {
  numerador: number;
  denominador: number;
}

@Component({
  selector: 'app-ejercicio',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './ejercicio.html',
  styleUrl: './ejercicio.css',
})
export class EjercicioComponent implements OnInit {
  // Ejercicio actual
  fraccion1: Fraccion = { numerador: 0, denominador: 1 };
  fraccion2: Fraccion = { numerador: 0, denominador: 1 };
  fraccion3?: Fraccion;
  
  // Respuestas del usuario
  respuestaNumerador: string = '';
  respuestaDenominador: string = '';
  
  // Estado del ejercicio
  intentos: number = 0;
  aciertos: number = 0;
  errores: number = 0;
  mostrarRetroalimentacion: boolean = false;
  esCorrecta: boolean = false;
  mensaje: string = '';
  
  // Configuración
  tipoEjercicio: 'igual' | 'diferente' = 'igual';
  dificultad: 'facil' | 'medio' | 'dificil' = 'facil';
  
  // Resultado correcto
  resultadoCorrecto: Fraccion = { numerador: 0, denominador: 1 };
  
  // Historial
  historial: Array<{
    ejercicio: string;
    respuesta: string;
    correcto: boolean;
  }> = [];

  ngOnInit(): void {
    this.generarEjercicio();
  }

  generarEjercicio(): void {
    this.limpiarRespuesta();
    
    if (this.tipoEjercicio === 'igual') {
      this.generarEjercicioIgualDenominador();
    } else {
      this.generarEjercicioDiferenteDenominador();
    }
    
    this.calcularResultadoCorrecto();
  }

  generarEjercicioIgualDenominador(): void {
    const denominadores = this.dificultad === 'facil' ? [4, 5, 6, 8] : 
                         this.dificultad === 'medio' ? [6, 8, 9, 10, 12] : 
                         [10, 12, 15, 20];
    
    const denominador = denominadores[Math.floor(Math.random() * denominadores.length)];
    
    this.fraccion1 = {
      numerador: Math.floor(Math.random() * (denominador - 1)) + 1,
      denominador: denominador
    };
    
    this.fraccion2 = {
      numerador: Math.floor(Math.random() * (denominador - 1)) + 1,
      denominador: denominador
    };
    
    // Asegurar que la suma no sea mayor que el denominador para facil
    if (this.dificultad === 'facil' && 
        this.fraccion1.numerador + this.fraccion2.numerador > denominador) {
      this.fraccion2.numerador = denominador - this.fraccion1.numerador - 1;
    }
    
    this.fraccion3 = undefined;
  }

  generarEjercicioDiferenteDenominador(): void {
    const pares = this.dificultad === 'facil' ? 
      [[2, 4], [3, 6], [2, 6], [4, 8]] :
      this.dificultad === 'medio' ?
      [[3, 5], [4, 6], [2, 5], [3, 9]] :
      [[5, 7], [6, 8], [4, 9], [5, 12]];
    
    const [den1, den2] = pares[Math.floor(Math.random() * pares.length)];
    
    this.fraccion1 = {
      numerador: Math.floor(Math.random() * (den1 - 1)) + 1,
      denominador: den1
    };
    
    this.fraccion2 = {
      numerador: Math.floor(Math.random() * (den2 - 1)) + 1,
      denominador: den2
    };
    
    this.fraccion3 = undefined;
  }

  calcularResultadoCorrecto(): void {
    if (this.fraccion1.denominador === this.fraccion2.denominador) {
      // Mismo denominador
      const sumaNumeradores = this.fraccion1.numerador + this.fraccion2.numerador;
      this.resultadoCorrecto = {
        numerador: sumaNumeradores,
        denominador: this.fraccion1.denominador
      };
    } else {
      // Diferente denominador
      const mcm = this.calcularMCM(this.fraccion1.denominador, this.fraccion2.denominador);
      const num1 = (this.fraccion1.numerador * mcm) / this.fraccion1.denominador;
      const num2 = (this.fraccion2.numerador * mcm) / this.fraccion2.denominador;
      
      this.resultadoCorrecto = {
        numerador: num1 + num2,
        denominador: mcm
      };
    }
    
    // Simplificar si es posible
    this.resultadoCorrecto = this.simplificarFraccion(this.resultadoCorrecto);
  }

  calcularMCM(a: number, b: number): number {
    const mcd = (x: number, y: number): number => y === 0 ? x : mcd(y, x % y);
    return (a * b) / mcd(a, b);
  }

  calcularMCD(a: number, b: number): number {
    return b === 0 ? a : this.calcularMCD(b, a % b);
  }

  simplificarFraccion(f: Fraccion): Fraccion {
    const mcd = this.calcularMCD(f.numerador, f.denominador);
    return {
      numerador: f.numerador / mcd,
      denominador: f.denominador / mcd
    };
  }

  verificar(): void {
    const numUsuario = parseInt(this.respuestaNumerador);
    const denUsuario = parseInt(this.respuestaDenominador);
    
    if (isNaN(numUsuario) || isNaN(denUsuario) || denUsuario === 0) {
      this.mensaje = '⚠️ Por favor, ingresa números válidos';
      this.mostrarRetroalimentacion = true;
      this.esCorrecta = false;
      return;
    }
    
    // Simplificar la respuesta del usuario
    const respuestaSimplificada = this.simplificarFraccion({
      numerador: numUsuario,
      denominador: denUsuario
    });
    
    this.intentos++;
    
    // Comparar fracciones simplificadas
    if (respuestaSimplificada.numerador === this.resultadoCorrecto.numerador &&
        respuestaSimplificada.denominador === this.resultadoCorrecto.denominador) {
      this.esCorrecta = true;
      this.aciertos++;
      this.mensaje = '🎉 ¡Excelente! Tu respuesta es correcta.';
      
      this.historial.push({
        ejercicio: `${this.fraccion1.numerador}/${this.fraccion1.denominador} + ${this.fraccion2.numerador}/${this.fraccion2.denominador}`,
        respuesta: `${numUsuario}/${denUsuario}`,
        correcto: true
      });
    } else {
      this.esCorrecta = false;
      this.errores++;
      this.mensaje = `❌ Incorrecto. La respuesta correcta es ${this.resultadoCorrecto.numerador}/${this.resultadoCorrecto.denominador}`;
      
      this.historial.push({
        ejercicio: `${this.fraccion1.numerador}/${this.fraccion1.denominador} + ${this.fraccion2.numerador}/${this.fraccion2.denominador}`,
        respuesta: `${numUsuario}/${denUsuario}`,
        correcto: false
      });
    }
    
    this.mostrarRetroalimentacion = true;
  }

  nuevoEjercicio(): void {
    this.generarEjercicio();
  }

  limpiarRespuesta(): void {
    this.respuestaNumerador = '';
    this.respuestaDenominador = '';
    this.mostrarRetroalimentacion = false;
    this.mensaje = '';
  }

  cambiarTipo(tipo: 'igual' | 'diferente'): void {
    this.tipoEjercicio = tipo;
    this.generarEjercicio();
  }

  cambiarDificultad(nivel: 'facil' | 'medio' | 'dificil'): void {
    this.dificultad = nivel;
    this.generarEjercicio();
  }

  reiniciarEstadisticas(): void {
    this.intentos = 0;
    this.aciertos = 0;
    this.errores = 0;
    this.historial = [];
    this.generarEjercicio();
  }

  get porcentajeAciertos(): number {
    return this.intentos > 0 ? Math.round((this.aciertos / this.intentos) * 100) : 0;
  }
}