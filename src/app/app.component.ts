import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedCity: string = ''; // Assuming this property holds the selected city
  searchText : string =''
  

  constructor() { }

  onCityChanged(city: string) {
    this.selectedCity = city;
  }
  onSearchTextChanged(searchText: string) {
    this.searchText = searchText;
  }
}
