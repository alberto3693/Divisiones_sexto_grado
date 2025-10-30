import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EjerciciosService } from '../../../services/ejercicios';

@Component({
  selector: 'app-ejercicio-resta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ejercicio.html',
  styleUrls: ['./ejercicio.css']
})
export class EjercicioResta {
  ejercicioActual: any;
  respuestaNumerador: number | null = null;
  respuestaDenominador: number | null = null;
  mensaje: string = '';
  mostrarResultado: boolean = false;
  esCorrecta: boolean = false;
  
  estadisticas = {
    correctas: 0,
    incorrectas: 0,
    total: 0
  };

  dificultad: 'facil' | 'medio' | 'dificil' = 'facil';

  constructor(private ejerciciosService: EjerciciosService) {
    this.generarNuevoEjercicio();
  }

  generarNuevoEjercicio() {
    this.mostrarResultado = false;
    this.mensaje = '';
    this.respuestaNumerador = null;
    this.respuestaDenominador = null;
    
    if (this.dificultad === 'facil') {
      this.ejercicioActual = this.ejerciciosService.generarRestaIgualDenominador();
    } else {
      this.ejercicioActual = this.ejerciciosService.generarRestaDistintoDenominador();
    }
  }

  verificarRespuesta() {
    if (this.respuestaNumerador === null || this.respuestaDenominador === null) {
      this.mensaje = '⚠️ Por favor completa ambos campos';
      return;
    }

    if (this.respuestaDenominador === 0) {
      this.mensaje = '❌ El denominador no puede ser cero';
      return;
    }

    this.estadisticas.total++;
    
    this.esCorrecta = this.ejerciciosService.verificarRespuestaResta(
      this.respuestaNumerador,
      this.respuestaDenominador,
      this.ejercicioActual.resultado.numerador,
      this.ejercicioActual.resultado.denominador
    );

    this.mostrarResultado = true;

    if (this.esCorrecta) {
      this.estadisticas.correctas++;
      this.mensaje = '🎉 ¡Excelente! Respuesta correcta';
    } else {
      this.estadisticas.incorrectas++;
      this.mensaje = `❌ Incorrecto. La respuesta correcta es ${this.ejercicioActual.resultado.numerador}/${this.ejercicioActual.resultado.denominador}`;
    }
  }

  cambiarDificultad(nivel: 'facil' | 'medio' | 'dificil') {
    this.dificultad = nivel;
    this.generarNuevoEjercicio();
  }

  get porcentajeAciertos(): number {
    if (this.estadisticas.total === 0) return 0;
    return Math.round((this.estadisticas.correctas / this.estadisticas.total) * 100);
  }

  reiniciarEstadisticas() {
    this.estadisticas = {
      correctas: 0,
      incorrectas: 0,
      total: 0
    };
    this.generarNuevoEjercicio();
  }

  get tieneDenominadorIgual(): boolean {
    return this.ejercicioActual.fraccion1.denominador === this.ejercicioActual.fraccion2.denominador;
  }
}