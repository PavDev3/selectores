import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="mt-3">
      <h1>Selectores</h1>
    </div>

    <form [formGroup]="countriesForm">
      <div class="row mb-3">
        <div class="col">
          <label class="form-label">Continente:</label>
          <select formControlName="continent" class="form-control">
            <option value="1">África</option>
            <option value="2">América</option>
            <option value="3">Asia</option>
            <option value="4">Europa</option>
            <option value="5">Oceanía</option>
          </select>
        </div>
      </div>
    </form>

    <h3>Formulario</h3>
    <code>
      {{ countriesForm.value | json }}
    </code>
    <p>Valido: {{ countriesForm.valid }}</p>
  `,
  styles: [],
})
export class SelectorComponent {
  readonly #formBuilder = inject(FormBuilder);

  readonly countriesForm = this.#formBuilder.group({
    continent: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });
}
