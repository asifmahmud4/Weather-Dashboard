import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CityService } from '../city.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html', // Check this path
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {
  @Input() selectedCity: string = '';
  cities: any[] = [];
  @Input() searchText:string='';
  //@Input() cityChanged = new EventEmitter<string>();
  

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.cityService.getCities().subscribe(
      cities => {
        this.cities = cities;
        
      },
      error => {
        console.error('Error fetching cities:', error);
      }
    );
  }
  
  isCityDisplayed(cityName: string): boolean {
    if ((this.selectedCity && cityName.toLowerCase() === this.selectedCity.toLowerCase()) ||
        (this.searchText && cityName.toLowerCase().includes(this.searchText.toLowerCase()))) {
      // Display weather information if the city matches the selected city or search text (case-insensitive)
      return true;
    } else {
      // Do not display weather information otherwise
      return false;
    }
  }
  
  
  
  

}
