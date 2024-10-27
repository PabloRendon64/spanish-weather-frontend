import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city.model';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})

export class WeatherComponent {

  weatherService = inject(WeatherService);

  cities: City[] = [];
  city: City | undefined;
  weather: Weather | undefined;

  temperatureUnit: string | undefined;
  queryName: string | undefined;

  constructor() {
  }

  findCities(queryName: string) {
    this.weatherService.getCities(queryName).subscribe((cities: City[]) => {
            this.cities = cities;
            this.city = cities[0];
            console.log(cities);
        },
      );
  }

  getWeatherPrediction(city: string) {
    
    this.weatherService.getWeatherPrediction(Number(city), this.temperatureUnit).subscribe({
        next: (weather: Weather) => {
            this.weather = weather;
            console.log(weather);
        },
      });
  }

}
