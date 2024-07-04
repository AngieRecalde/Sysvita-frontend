import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Modificamos appConfig para incluir HttpClient y Router
const updatedConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(),
    provideRouter([])
  ]
};

bootstrapApplication(AppComponent, updatedConfig)
  .catch((err) => console.error(err));