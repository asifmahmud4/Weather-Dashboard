import { Component, EventEmitter, Output } from '@angular/core';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.css']
})
export class CitySelectorComponent {
  selectedCity: string = '';
  cities: any[] = [];
  searchText: string = ''; 
  suggestedCities: string[] = [];
  @Output() cityChanged = new EventEmitter<string>();
  @Output() searchTextChange = new EventEmitter<string>(); // Declare searchTextChange as Output

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

  onCityChanged() {
    this.cityChanged.emit(this.selectedCity);
  }

  onSearchTextChanged() {
    this.searchTextChange.emit(this.searchText); // Emit searchText when it changes
    if (this.searchText) {
      // Filter cities based on search text
      this.suggestedCities = this.cities
        .filter(city => city.toLowerCase().includes(this.searchText.toLowerCase()))
        .slice(0, 5); // Limit suggestions to 5
    } else {
      // Clear suggestions if search text is empty
      this.suggestedCities = [];
    }
  }
}
