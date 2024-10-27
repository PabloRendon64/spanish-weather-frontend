import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { WeatherComponent } from './components/weather/weather.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    WeatherComponent,
    HttpClientModule
  ],
  providers: [
    WeatherService,
  ],
  template: `
    <main>
        <header class="brand-name">
          Servicio de predicción del tiempo
        </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weather';
}
