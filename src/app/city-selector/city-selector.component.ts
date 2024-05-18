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
  searchQuery: string = '';
  suggestedCities: string[] = [];
  dropdownOpen: boolean = false;
  filteredCities: any[] = [];
  @Output() cityChanged = new EventEmitter<string>();
  @Output() searchTextChange = new EventEmitter<string>();

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.cityService.getCities().subscribe(
      cities => {
        this.cities = cities;
        this.filteredCities = cities; // Initialize filteredCities with all cities
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
    this.searchTextChange.emit(this.searchText); 
    if (this.searchText) {
      this.suggestedCities = this.cities
        .filter(city => city.name.toLowerCase().includes(this.searchText.toLowerCase()))
        .slice(0, 5); // Display up to 5 suggestions
    } else {
      this.suggestedCities = [];
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterCities() {
    const filter = this.searchQuery.toLowerCase();
    this.filteredCities = this.cities.filter(city => city.name.toLowerCase().includes(filter));
  }

  selectCity(city: { name: string }) {
    this.selectedCity = city.name;
    this.cityChanged.emit(this.selectedCity);
    this.dropdownOpen = false;
  }
}
