import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, switchMap } from 'rxjs';
import { Region } from '../country/interfaces/country.interfaces';
import { CountriesService } from '../country/services/countries.service';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="mt-3">
      <h1>Selectores</h1>
    </div>
    <!-- Region -->
    <form [formGroup]="regionsForm">
      <div class="row mb-3">
        <div class="col">
          <label class="form-label">Continente:</label>
          <select formControlName="region" class="form-control">
            <option value="">Seleccione un continente</option>
            @for (region of regions; track region) {
            <option value="{{ region }}">{{ region }}</option>
            }
          </select>
        </div>
      </div>
    </form>

    <!-- Country -->
    <form [formGroup]="countriesForm">
      <div class="row mb-3">
        <div class="col">
          <label class="form-label">País:</label>
          <select formControlName="country" class="form-control">
            <option value="">Seleccione un país</option>
            <!-- @for (country of countries; track country) {
            <option value="{{ country }}">{{ country }}</option>
            } -->
          </select>
        </div>
      </div>
    </form>

    <h3>Formulario</h3>
    <code>
      {{ regionsForm.value | json }}
    </code>
    <p>Valido: {{ regionsForm.valid }}</p>
  `,
  styles: [],
})
export class SelectorComponent implements OnInit {
  readonly #formBuilder = inject(FormBuilder);
  readonly #countriesService = inject(CountriesService);

  readonly regionsForm = this.#formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  readonly countriesForm = this.#formBuilder.group({
    country: ['', Validators.required],
  });

  ngOnInit(): void {
    this.onRegionChanged();
  }

  get regions() {
    return this.#countriesService.regions;
  }

  onRegionChanged() {
    this.regionsForm
      .get('region')!
      .valueChanges.pipe(
        filter((region) => region !== null && region !== ''),
        switchMap((region) =>
          this.#countriesService.getCountriesByRegion(region as Region)
        )
      )
      .subscribe((countries) => {
        console.log(countries);
      });
  }
}
