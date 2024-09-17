import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function bordersValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const bordersControl = form.get('borders');

    // Verificar si el país tiene fronteras habilitadas
    if (bordersControl?.untouched) {
      return { required: false };
    }

    // Si no se requiere seleccionar frontera o si se ha seleccionado una, es válido
    return null;
  };
}
