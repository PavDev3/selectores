import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';
import { Region, SmallCountry } from '../country/interfaces/country.interfaces';
import { bordersValidator } from '../country/services/border.validator';
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
    @if (countriesByRegion.length > 0) {
    <form [formGroup]="regionsForm">
      <div class="row mb-3">
        <div class="col">
          <label class="form-label">País:</label>
          <select formControlName="country" class="form-control">
            <option value="">Seleccione un país</option>
            @for (country of countriesByRegion; track country) {
            <option value="{{ country.cca3 }}">{{ country.name }}</option>
            }
          </select>
        </div>
      </div>
    </form>
    }

    <!-- Borders -->
    @if (borders.length > 0) {
    <form [formGroup]="regionsForm">
      <div class="row mb-3">
        <div class="col">
          <label class="form-label">Fronteras:</label>
          <select formControlName="borders" class="form-control">
            <option value="">Seleccione una frontera</option>
            @for (border of borders; track border) {
            <option value="{{ border.cca3 }}">{{ border.name }}</option>
            }
          </select>
        </div>
      </div>
    </form>
    }

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

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  readonly regionsForm = this.#formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', [Validators.required, bordersValidator()]],
  });

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions() {
    return this.#countriesService.regions;
  }

  onRegionChanged() {
    this.regionsForm
      .get('region')!
      .valueChanges.pipe(
        //Para limpiar el campo de país cuando se cambia de región
        tap(() => this.regionsForm.get('country')?.reset('')),
        //Para evitar que se envíen valores vacíos
        filter(Boolean),
        //Para obtener los países de la región seleccionada
        switchMap((region) =>
          this.#countriesService.getCountriesByRegion(region as Region)
        )
      )
      //Para actualizar la lista de países
      .subscribe((countries) => {
        this.countriesByRegion = countries;
        //Ordenar la lista de países
        this.countriesByRegion.sort((a, b) => a.name.localeCompare(b.name));
      });
  }

  onCountryChanged() {
    this.regionsForm
      .get('country')!
      .valueChanges.pipe(
        // Limpiar el campo de fronteras cuando se cambia de país
        tap(() => this.regionsForm.get('borders')?.reset('')),
        tap(() => this.regionsForm.get('borders')?.disable()),
        // Filtrar para asegurarse de que solo pasen valores que sean cadenas no vacías
        filter(Boolean),
        // switchMap para hacer la llamada al servicio con el cca3 seleccionado
        switchMap((cca3: string) =>
          this.#countriesService.getCountryByAlphaCode(cca3)
        ),
        // switchMap para hacer la llamada al servicio con los códigos de frontera
        switchMap((country) =>
          this.#countriesService.getCountryBordersByCodes(country.borders)
        )
      )
      .subscribe((countries) => {
        this.borders = countries;
        if (countries.length > 0) {
          this.regionsForm.get('borders')?.enable();
        }
      });
  }
}
