import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { pairs } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountrysService {

  url = 'https://restcountries.eu/rest/v2/lang/es';

  constructor( private http: HttpClient ) { }

  getCountrys() {
    return this.http.get(this.url).pipe( map( (response: any[]) =>
       response.map( country => ({ name: country.name, cod: country.alpha3Code }) )
    ));
  }

}
