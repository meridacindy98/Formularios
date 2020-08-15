import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { rejects } from 'assert';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  // Validacion que no me permite ingresar valores igual a "Herrera"
  noHerrera( control: FormControl ): ErrorValidate {
    if ( control.value?.toLowerCase() === 'herrera' ) {
      return { noHerrera: true };
    }
    return null;
  }

  // Valido que haya almenos un numero en la pass
  numberPass( control: FormControl ): ErrorValidate  {
    const pass = control.value;
    for ( const character of pass ) {
       if ( !isNaN( character ) ) {
        return null;
       }
    }
    return { noNumberPass: true };
  }

  // Valido que haya almenos una letra mayuscula en la pass
  upperCasePass( control: FormControl ): ErrorValidate  {
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

  // Valida que el usuario que ingrese no exista
  userExists( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {

    if ( !control.value ) {
      return Promise.resolve( null );
    }
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            if ( control.value === 'filips' ) {
              resolve( { userExists: true } );
            } else {
              resolve( null );
            }
          }, 1500 );
      } );


  }

  // Valido que las dos contraseñas sean iguales
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
