import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Register } from 'src/app/models/register';
import { rutValidator } from '../../validators/rut.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage {
  registerForm: FormGroup;
  mostrarPassword: boolean = false;
  regiones: string[] = ['Región Metropolitana', 'Valparaíso', 'Biobío'];
  comunas: string[] = ['Seleccione región'];
  
  comunasPorRegion: { [key: string]: string[] } = {
    'Región Metropolitana': ['Santiago', 'Puente Alto', 'Maipú'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué'],
    'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles'],
  };

  constructor(private fb: FormBuilder,private serviceRegister:RegisterService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      rut: ['', [Validators.required, rutValidator]],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    }, { validators: this.passwordMatchValidator });
   }


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }
  onRegionChange(region: string) {
    this.comunas = this.comunasPorRegion[region] || [];
    this.registerForm.patchValue({ comuna: '' });
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  formatearRut() {
  let rut = this.registerForm.get('rut')?.value || '';

  // Elimina puntos y guiones
  rut = rut.replace(/[^0-9kK]/gi, '').toUpperCase();

  // Si hay menos de 2 caracteres, no formatear aún
  if (rut.length <= 1) {
    this.registerForm.get('rut')?.setValue(rut, { emitEvent: false });
    return;
  }

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  // Agregar puntos al cuerpo
  let cuerpoFormateado = '';
  let reversed = cuerpo.split('').reverse().join('');
  let grupos = reversed.match(/.{1,3}/g);
  if (grupos) {
    cuerpoFormateado = grupos.join('.').split('').reverse().join('');
  }

  const rutFormateado = `${cuerpoFormateado}-${dv}`;
  this.registerForm.get('rut')?.setValue(rutFormateado, { emitEvent: false });
}


  onSubmit() {
    if (this.registerForm.valid) {
      const datos: Register = this.registerForm.value;
      this.serviceRegister.register(datos).subscribe({
        next: (res) => {
          console.log('Registro exitoso:', res);
          // Puedes redirigir o mostrar alerta
        },
        error: (err) => {
          console.error('Error en registro:', err.error?.message || err.message);
        }
      })

      console.log('Formulario enviado:', this.registerForm.value);
    
    
    } else {
      this.registerForm.markAllAsTouched();
    }
  }



}
