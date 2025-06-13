import { AbstractControl, ValidationErrors } from '@angular/forms';

export function rutValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  // Validar que exista valor
  if (!value) return null;

  // Limpieza del RUT
  const rut = value.replace(/[^0-9kK]/g, '').toUpperCase();
  if (rut.length < 2) return { rutInvalido: true };

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = suma % 11;
  const dvEsperado = 11 - resto;

  const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  return dv === dvFinal ? null : { rutInvalido: true };
}
