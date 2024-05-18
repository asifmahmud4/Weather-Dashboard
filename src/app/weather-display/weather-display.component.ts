import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CityService } from '../city.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {
  @Input() selectedCity: string = '';
  cities: any[] = [];
  @Input() searchText:string='';
  @Input() searchQuery:string=''
  
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
  
  // Define getWeatherImage outside of isCityDisplayed
  getWeatherImage(weather: string): string {
    switch (weather.toLowerCase()) {
      case 'sunny':
        return 'https://previews.123rf.com/images/articoufa/articoufa0911/articoufa091100031/5852077-sunny-weather-in-summer-nice-background.jpg';
      case 'cloudy':
        return 'https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg';
      case 'rainy':
        return 'https://thumbs.dreamstime.com/b/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept-191493424.jpg';
      // Add more cases for other weather conditions as needed
      case 'partly cloudy': // New case for partly cloudy
      return 'https://t4.ftcdn.net/jpg/05/76/71/09/360_F_576710966_O38QFCqtl23ADMCXNbiskTqmNTR4VK0Q.jpg';
      default:
        return 'https://www.shutterstock.com/image-photo/austria-tyrol-axamer-lizum-clear-600nw-2408518739.jpg'; // Default image if weather is unknown
    }
  }
}