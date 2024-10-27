import { Injectable } from '@angular/core';
import { City, CityResponse } from '../models/city.model';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) {
  }

  public getCities(queryName: string): Observable<City[]> {
    const url = environment.weatherApi;
    return this.httpClient.get<CityResponse>(url + '/cities/search', { params : new HttpParams().set('query_name', queryName) })
      .pipe(
        map( (cityResponse : CityResponse) => cityResponse.content)
      );
  }

  public getWeatherPrediction(cityId: number, temperatureUnit?: string): Observable<Weather> {
    const url = environment.weatherApi;
    let params = new HttpParams().set('city_id', cityId)
    if (temperatureUnit) {
      params = params.append('temperature_unit', temperatureUnit)
    }
    return this.httpClient.get<Weather>(url + '/weather/prediction', { params : params });
  }

}
