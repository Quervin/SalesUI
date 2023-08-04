import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public countries: Country[] = [];

  constructor( private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries()
    .subscribe( country =>  this.countries = country);
  }



}
