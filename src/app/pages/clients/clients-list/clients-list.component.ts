import { Component, inject, OnInit } from '@angular/core';
import { Gender, Document, IClient } from '../../../models/client.model';
import { ApiClientsService } from '../../../services/api-clients.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent implements OnInit {
  clientsList : IClient[] = [];

  formRegist : FormGroup
  //IDType = ["ID Card", "Passport", "Driver License"] //forma manual
  //IDType: Document = Document.Card // esto sirve para usar un solo valor del enum
  //IDType: Document[] = [Document.Card, Document.Passport, Document.License]// Forma manual de traer por etiquetas del enum 
  IDType: Document[] = Object.values(Document) //Forma automatica de traer todos los valores del enum
  genders: Gender[]= Object.values(Gender)

  newClient?: IClient

  private _apiClientService = inject(ApiClientsService)
  
  constructor(private form: FormBuilder) {
    this.formRegist = this.form.group({
      first_name:['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastname:['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      second_lastname:['', [Validators.pattern(/^[A-Za-z]+$/)]],
      document_type:[this.IDType[0]],
      document_number:['', [Validators.required, Validators.pattern('[0-9]+(\\.)?[0-9]*')]],
      birthday:[''],
      gender:[this.genders[0]]
    })
   }
  
  ngOnInit(): void {
    this.getAllClientsFromApi()
    
    //Para cambiar etiquetas segun lo seleccionado en el select
    /*
    this.formRegist.get('document_type')?.valueChanges.subscribe(value=>{
      this.IDTypeSelected = value //IDTypeSelected seria una variable declarada de tipo string
      })
      */
    
  }

  getAllClientsFromApi(){
    this._apiClientService.getAllClients().subscribe((data:IClient[])=>{
      this.clientsList=data;
    })
    
  }

  registClient(event : Event){
    event.preventDefault();
    this.newClient = this.formRegist.value
    console.log(this.newClient)

    this.reseteo()
  }

  hasErrors(controlName: string, errorType: string, touchedField: Boolean = true){
    return touchedField
    ?this.formRegist.get(controlName)?.hasError(errorType)&&this.formRegist.get(controlName)?.touched 
    : this.formRegist.get(controlName)?.hasError(errorType) 
  }

  reseteo(){
 
    //otra forma de reseteo
    this.formRegist.reset()
    this.formRegist.get('document_type')?.setValue(this.IDType[0])
    this.formRegist.get('gender')?.setValue(this.genders[0])
  }
}
