import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountrysService } from '../../services/countrys.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario =  {
    nombre: '',
    apellido: '',
    correo: '',
    country: '',
    sex: ''
  };

  countrys: any[] = [];

  constructor( private countrysService: CountrysService ) { }

  ngOnInit(): void {
    this.countrysService.getCountrys().subscribe( countrys => {
      this.countrys = countrys;
      console.log(countrys);
    } );
  }

  save( formTemplate: NgForm ) {
    if ( formTemplate.invalid ) {
      Object.values( formTemplate.controls ).forEach( control => {
        control.markAllAsTouched();
        console.log(control);
       } );
      return;
    }
    console.log( formTemplate.value );

  }

}
