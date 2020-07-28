import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  // Validacion que no me permite ingresar valores igual a "Herrera"
  noHerrera( control: FormControl ): { [s: string]: boolean } {
    if ( control.value?.toLowerCase() === 'herrera' ) {
      return { noHerrera: true };
    }
    return null;
  }

  // Valido que haya almenos un numero en la pass
  numberPass( control: FormControl ): { [s: string]: boolean }  {
    const pass = control.value;
    for ( const character of pass ) {
       if ( !isNaN( character ) ) {
        return null;
       }
    }
    return { noNumberPass: true };
  }

  // Valido que haya almenos una letra mayuscula en la pass
  upperCasePass( control: FormControl ): { [s: string]: boolean }  {
    const pass = control.value;
    for ( const character of pass ) {
      if ( isNaN( character ) ) {
        if ( character === character.toUpperCase() ) {
          return null;
        }
       }
     }
    return { noUpperCase: true };
  }

  equealPass( pass1: string, pass2: string ) {
    return ( formGroup: FormGroup ) => {
      const PASS1 = formGroup.controls[pass1];
      const PASS2 = formGroup.controls[pass2];

      if ( PASS1.value === PASS2.value ) {
        PASS2.setErrors(null);
      } else {
        PASS2.setErrors( { noEqueal: true } );
      }
    };
  }

}
