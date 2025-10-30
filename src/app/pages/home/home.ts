import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  cursos = [
    {
      id: 1,
      titulo: 'Suma de Fracciones',
      descripcion: 'Aprende a sumar fracciones con denominadores iguales y diferentes',
      icono: '➕',
      color: '#4CAF50',
      imagen: '🥤',
      modulos: [
        { id: 1, titulo: 'Concepto', ruta: '/concepto', icono: '📚', descripcion: 'Aprende la teoría fundamental' },
        { id: 2, titulo: 'Ejemplo', ruta: '/ejemplo', icono: '👁️', descripcion: 'Observa ejemplos resueltos paso a paso' },
        { id: 3, titulo: 'Ejercicio', ruta: '/ejercicio', icono: '✍️', descripcion: 'Practica con ejercicios interactivos' }
      ]
    },
    {
      id: 2,
      titulo: 'Resta de Fracciones',
      descripcion: 'Domina la resta de fracciones con denominadores iguales y diferentes',
      icono: '➖',
      color: '#FF6B6B',
      imagen: '🧃',
      modulos: [
        { id: 1, titulo: 'Concepto', ruta: '/conceptoresta', icono: '📚', descripcion: 'Aprende la teoría fundamental' },
        { id: 2, titulo: 'Ejemplo', ruta: '/ejemploresta', icono: '👁️', descripcion: 'Observa ejemplos resueltos paso a paso' },
        { id: 3, titulo: 'Ejercicio', ruta: '/ejercicioresta', icono: '✍️', descripcion: 'Practica con ejercicios interactivos' }
      ]
    }
  ];

  cursoSeleccionado: any = null;

  seleccionarCurso(curso: any) {
    this.cursoSeleccionado = curso;
  }

  volverACursos() {
    this.cursoSeleccionado = null;
  }
}