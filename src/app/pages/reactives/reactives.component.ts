import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactives',
  templateUrl: './reactives.component.html',
  styleUrls: ['./reactives.component.css']
})
export class ReactivesComponent implements OnInit {

  formReactive: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.createForm();
    this.loadForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formReactive = this.formBuilder.group({    // Creo un nuevo FormGroup
      name: [ '', [Validators.required, Validators.minLength(3)] ],
      lastName: [ '', [Validators.required, Validators.minLength(3)] ],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      direction: this.formBuilder.group({
        state: ['', Validators.required],
        city: ['', Validators.required]
      }),
      hobbies: this.formBuilder.array([  // Creo un FormArray
        [], [], []
      ])
    });
    console.log(this.formReactive);
    console.log(this.formReactive.get('hobbies') as FormArray);
  }

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
      direction: {
        state: 'Buenos Aires',
      }
    });
  }

  save() {
    if ( this.formReactive.invalid ) {
      Object.values( this.formReactive.controls ).forEach( control => {
        control.markAllAsTouched();
       } );
      return;
    }
    this.formReactive.reset();
  }

  isInvalid(fields: string) {
    return this.formReactive.get(fields).invalid && this.formReactive.get(fields).touched;
  }

  get hobbies() {
    return this.formReactive.get('hobbies') as FormArray;
  }
}
