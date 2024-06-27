import { Component, OnInit } from '@angular/core';
import { IVehicle } from '../../../models/vehicle.model';
import { ApiVehiclesService } from '../../../services/api-vehicles.service';
import { Injectable, inject } from '@angular/core';
import { VehiclesDetailComponent } from "../vehicles-detail/vehicles-detail.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-vehicles-list',
    standalone: true,
    templateUrl: './vehicles-list.component.html',
    styleUrl: './vehicles-list.component.css',
    imports: [ReactiveFormsModule, NgClass]
})
export class VehiclesListComponent implements OnInit{


 vehicleList : IVehicle[] = [];
 formRegist: FormGroup;
 vehicleRegist?: IVehicle;
 private _apiVehiclesService = inject(ApiVehiclesService);
 private _router = inject(Router)

 constructor(private form: FormBuilder){
  this.formRegist = this.form.group({
    brand: ['', Validators.required],
    model:['', Validators.required],
    year: ['',  [Validators.required, Validators.pattern('[0-9]+(\\.)?[0-9]*')]],
    plate: ['', Validators.required]
  })
}
 
 
  ngOnInit(): void {
    this.getAllVehiclesFromApi()
  }

  getAllVehiclesFromApi():void{
    this._apiVehiclesService.getAllVehicles().subscribe((data:IVehicle[])=>{
      this.vehicleList=data
    })
  }

  registVehicle(event: Event) {
    event.preventDefault();

    this.vehicleRegist = this.formRegist.value;

    if(!this.hasErrors('brand', 'required', false) 
      && !this.hasErrors('model', 'required', false) 
    && !this.hasErrors('year', 'required', false) 
    &&!this.hasErrors('plate', 'required', false)){

      if(this.vehicleRegist){
        this._apiVehiclesService.createVehicle(this.vehicleRegist).subscribe((data:IVehicle)=>{
          this.getAllVehiclesFromApi();
        })
       
      }
   
      this.formRegist.get('brand')?.setValue('');
      this.formRegist.get('model')?.setValue('');
      this.formRegist.get('year')?.setValue('');
      this.formRegist.get('plate')?.setValue('');

      
      //otra forma
      /*
      this.formRegist.patchValue({
        brand: '',
        model: '',
        year: '',
        plate: this.arrayDeDatos.plate //usado para poner valores apartir de un objeto

      })
*/

this.reseteo() // en realidad solo haria falta esta fila y ya no las de arriba, solo se deja para ejemplificar el manejo de datos 
    }
  }


   hasErrors(controlName: string, errorType: string, touchedField: Boolean = true){
    return touchedField
    ?this.formRegist.get(controlName)?.hasError(errorType)&&this.formRegist.get(controlName)?.touched 
    : this.formRegist.get(controlName)?.hasError(errorType) 
  }

  reseteo(){
 
    //otra forma de reseteo
    this.formRegist.reset()
  }

  deleteVehicle(vehicleId: string|undefined, vehiclePlate: string|undefined) {
    //console.log("Se borrara el id:", vehicleId)
    let acceptDelete = confirm(`¿Esta seguro de eliminar el vehiculo ${vehiclePlate}?`)
    if(acceptDelete) {
      //console.log("deberia borrarse")
      this._apiVehiclesService.deleteVehicle(vehicleId || "0").subscribe((data:any)=>{
        this.getAllVehiclesFromApi()
      })
      
    }
      
    }


    navigate(vehicleId: string|undefined) {
        this._router.navigate(['/vehicles', vehicleId])
      }
}
