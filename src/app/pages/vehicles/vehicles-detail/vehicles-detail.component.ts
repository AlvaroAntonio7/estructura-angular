import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiVehiclesService } from '../../../services/api-vehicles.service';
import { IVehicle } from '../../../models/vehicle.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-vehicles-detail',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './vehicles-detail.component.html',
  styleUrl: './vehicles-detail.component.css'
})
export class VehiclesDetailComponent implements OnInit {

 loading:boolean = true;
public vehicle?: IVehicle;
formRegist: FormGroup
  newVehicle!: IVehicle;

constructor(private form: FormBuilder){
  this.formRegist = this.form.group({
    brand: ['', Validators.required],
    model:['', Validators.required],
    year: ['',  [Validators.required, Validators.pattern('[0-9]+(\\.)?[0-9]*')]],
    plate: ['', Validators.required]
  })
}


 private _route = inject (ActivatedRoute)
 private _apiService = inject(ApiVehiclesService)
 private _router = inject(Router)
 
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._apiService.getVehicle(params['vehicleId']).subscribe((data:IVehicle)=>{
        this.vehicle = data;
        this.formRegist.patchValue({
          brand: this.vehicle.brand,
          model: this.vehicle.model,
          year: this.vehicle.year,
          plate: this.vehicle.plate

        })
        this.newVehicle = this.vehicle
        this.loading = false
      })
    })
  }

  editVehicle(event: Event) {
    event.preventDefault()
    this.newVehicle = this.formRegist.value
    this.newVehicle.id = this.vehicle?.id

    //console.log(this.newVehicle)

    this._apiService.updateVehicle(this.newVehicle).subscribe((data: IVehicle)=>{
      this.vehicle = data
    })
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

  navigate(){
    this._router.navigate(['/vehicles'])
  }

}
