import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { error } from 'protractor';

@Component({
  selector: 'app-reactives',
  templateUrl: './reactives.component.html',
  styleUrls: ['./reactives.component.css']
})
export class ReactivesComponent implements OnInit {

  formReactive: FormGroup;
  minLengthPass: boolean;
  noEquealsPass: boolean;
  numberPass: boolean;
  upperCasePass: boolean;
  noData: boolean;

  constructor( private formBuilder: FormBuilder, private validators: ValidatorsService ) {
    this.createForm();
    this.loadForm();
    this.createListener();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formReactive = this.formBuilder.group({    // Creo un nuevo FormGroup
      name: [ '', [Validators.required, Validators.minLength(3)] ],
      lastName: [ '', [Validators.required, Validators.minLength(3), this.validators.noHerrera] ],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      user: [ '', , this.validators.userExists ],
      pass1: [ '', [Validators.required, Validators.minLength(3), this.validators.numberPass, this.validators.upperCasePass] ],
      pass2: [ '', [Validators.required, Validators.minLength(3)] ],
      direction: this.formBuilder.group({
        state: ['', [Validators.required, Validators.minLength(3)]],
        city: ['', [Validators.required, Validators.minLength(3)]]
      }),
      hobbies: this.formBuilder.array([]) // Creo un FormArray
    }, { // validacion a nivel formulario
      validators: this.validators.equealPass('pass1', 'pass2')
    });

    console.log(this.formReactive);
  }

  // Carga el formulario con datos
  loadForm() {
    // seteando valores con setValue
    /* this.formReactive.setValue({
      name: 'Cindy',
      lastName: 'Rojas',
      email: 'meridacindy98@yahoo.com.ar',
      direction: {
        state: 'Buenos Aires',
        city: 'Ciudadela'
      }
    }); */

    // seteando valores con reset
    this.formReactive.reset({
      name: 'Cindy',
      lastName: 'Rojas',
      email: 'meridacindy98@yahoo.com.ar',
      pass1: 'Tumami1123',
      pass2: 'Tumami1123',
      direction: {
        state: 'Buenos Aires',
        city: 'Ciudadela'
      }
    });

    ['Jugar', 'Dormir'].forEach( hobbie => this.hobbies.push( this.formBuilder.control(hobbie) ) );
  }

  createListener() {
/*     this.formReactive.valueChanges.subscribe( valor => {
      console.log(valor);
    } );

    this.formReactive.statusChanges.subscribe( valor => {
      console.log(valor);
    } ); */

    this.formReactive.get('name').valueChanges.subscribe( console.log );
    this.formReactive.get('name').statusChanges.subscribe( console.log );

  }

  createhobbie() {
    this.hobbies.push( this.formBuilder.control(''));
  }

  deleteHobbie(i: number) {
    this.hobbies.removeAt(i);
  }

  save() {
    this.noData = false;

    console.log('save');
    console.log(this.formReactive);

    if ( this.formReactive.pristine ) {
      this.noData = true;
      console.log('ta todo vacio pa');
    } else {
      this.minLengthPass =  this.minLength('pass1');
      this.upperCasePass = this.upperCase();
      this.noEquealsPass = this.noEqueals();
      this.numberPass =  this.number();
    }

    if ( this.formReactive.invalid ) {
      Object.values( this.formReactive.controls ).forEach( control => {
        control.markAllAsTouched();
       } );
      return;
    }
    this.formReactive.reset();
  }

  // validaciones
  isRequired(fields: string) {
    return this.formReactive.get(fields).hasError('required') && this.formReactive.get(fields).touched
    && !this.formReactive.get(fields).pristine;
  }
  minLength(fields: string) {
    return this.formReactive.get(fields).hasError('minlength') && this.formReactive.get(fields).touched;
  }

  noHerrera() {
    return this.formReactive.get('lastName').hasError('noHerrera') && this.formReactive.get('lastName').touched;
  }

  number() {
    return this.formReactive.get('pass1').hasError('noNumberPass') && this.formReactive.get('pass1').touched;
  }

  upperCase() {
    return this.formReactive.get('pass1').hasError('noUpperCase') && this.formReactive.get('pass1').touched;
  }

  noEqueals() {
    return this.formReactive.get('pass2').hasError('noEqueal') && this.formReactive.get('pass2').touched;
  }

  errorEmail() {
    return this.formReactive.get('email').hasError('pattern') && this.formReactive.get('email').touched;
  }

  userNoValid() {
    return this.formReactive.get('user').hasError('userExists') && this.formReactive.get('user').touched;
  }

  // getter
  get hobbies() {
    return this.formReactive.get('hobbies') as FormArray;
  }
}
