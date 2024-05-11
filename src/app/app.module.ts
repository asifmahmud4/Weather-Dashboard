import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed

import { AppComponent } from './app.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { CityService } from './city.service';
import { CitySelectorComponent } from './city-selector/city-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherDisplayComponent,
    CitySelectorComponent
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule // Add FormsModule if needed
  ],
  providers: [CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
