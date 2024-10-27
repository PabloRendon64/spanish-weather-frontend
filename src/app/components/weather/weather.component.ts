import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap, filter, tap} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { City } from '../../models/city.model';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather.model';
import { TemperatureUnit } from '../../models/temperature-unit.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})

export class WeatherComponent implements OnInit {

  weatherService = inject(WeatherService);

  cityControl = new FormControl();
  filteredOptions: Observable<City[]> | undefined;
  temperatureUnitControl = new FormControl();
  temperatureUnits: TemperatureUnit[] = [{name: 'Celsius', id: 'G_CEL'}, {name: 'Fahrenheit', id: 'G_FAH'} ];

  weather: Weather | undefined;
  displayedColumns: string[] = ['periodo', 'probabilidad'];

  ngOnInit() {
    this.filteredOptions = this.cityControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => (value && value.length >= 2) ? this._filter(value || '') : []),
    );
  }

  private _filter(value: string): Observable<City[]> {
    const filterValue = value.toLowerCase();
    return this.weatherService.getCities(filterValue)
      .pipe(
      );
  }

  cityAutocompelteDisplayProperty(value: City) {
    if (value) {
      return value.name;
    }
    return '';
  }

  onChangeField(evt: any) {
    if (evt.source && this.cityControl.value) {
      this.getWeatherPrediction(this.cityControl.value);
    }
  }

  getWeatherPrediction(city: City) {
    let temperatureUnit:string | undefined;
    if (this.temperatureUnitControl.value) {
      temperatureUnit = this.temperatureUnitControl.value;
    }

    this.weatherService.getWeatherPrediction(city.id, temperatureUnit).subscribe({
        next: (weather: Weather) => {
            this.weather = weather;
        },
      });
  }

  temperatureUnitdisplayValue(value: string) {
      return this.temperatureUnits.find(unit => unit.id === value)?.name;
  }

}
