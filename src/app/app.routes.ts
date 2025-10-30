import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Concepto } from './pages/suma-fracciones/concepto/concepto';
import { Ejemplo} from './pages/suma-fracciones/ejemplo/ejemplo';
import { EjercicioComponent } from './pages/suma-fracciones/ejercicio/ejercicio';
import { Conceptoresta } from './pages/resta-fracciones/concepto/concepto';  
import { Ejemploresta } from './pages/resta-fracciones/ejemplo/ejemplo';
import { EjercicioResta } from './pages/resta-fracciones/ejercicio/ejercicio';
import { ConceptoMultiplicacion } from './pages/multiplicacion-fracciones/concepto/concepto';
import { EjemploMultiplicacion } from './pages/multiplicacion-fracciones/ejemplo/ejemplo';
import { EjercicioMultiplicacion } from './pages/multiplicacion-fracciones/ejercicio/ejercicio';  


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'concepto', component: Concepto },
  { path: 'ejemplo', component: Ejemplo },
  { path: 'ejercicio', component: EjercicioComponent },
  {path: 'conceptoresta', component: Conceptoresta },
  {path: 'ejemploresta', component: Ejemploresta },
  {path: 'ejercicioresta', component: EjercicioResta },
  {path: 'conceptomultiplicacion', component: ConceptoMultiplicacion },
  {path: 'ejemplomultiplicacion', component: EjemploMultiplicacion }, 
  {path: 'ejerciciomultiplicacion', component: EjercicioMultiplicacion },
  { path: '**', redirectTo: '' }
];


