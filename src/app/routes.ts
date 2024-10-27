import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';

const routeConfig: Routes = [
  {
    path: '',
    component: WeatherComponent,
    title: 'Prediccion de tiempo'
  },
];

export default routeConfig;
