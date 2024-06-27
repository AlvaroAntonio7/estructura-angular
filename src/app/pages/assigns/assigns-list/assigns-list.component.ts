import { Component, inject, OnInit } from '@angular/core';
import { IAssign, IAssigned } from '../../../models/assign.model';
import { ApiAssignsService } from '../../../services/api-assigns.service';
import { ApiClientsService } from '../../../services/api-clients.service';
import { ApiVehiclesService } from '../../../services/api-vehicles.service';
import { IClient } from '../../../models/client.model';
import { IVehicle } from '../../../models/vehicle.model';

@Component({
  selector: 'app-assigns-list',
  standalone: true,
  imports: [],
  templateUrl: './assigns-list.component.html',
  styleUrl: './assigns-list.component.css'
})
export class AssignsListComponent implements OnInit{
  assignsList : IAssign[] = [];
  private _apiAssignsService = inject(ApiAssignsService)
  private _apiClientsService = inject(ApiClientsService)
  private _apiVehiclesService = inject(ApiVehiclesService)
  clientsList: IClient[]=[]
    vehiclesList: IVehicle[] = []
    clientVehicleList: IAssigned[] = []
  
    isOk :Boolean = false

  ngOnInit(): void {
    this.getAllData()
    console.log("clientVehicleList", this.clientVehicleList)
  }

  getAllAssignsFromApi(){
    this._apiAssignsService.getAllAssigns().subscribe((data : IAssign[]) =>{
      this.assignsList = data;
      this.getClients()
      this.getVehicles()
      })
    }

 getClients() { //TODO : if is null
    this.assignsList.map((assign, index)=>{
      this._apiClientsService.getClient(assign.client_id!!).subscribe((data:IClient)=>{
        this.clientsList!![index] = data;
        this.getVehicles()
      })
    })
  }

  getVehicles() { //TODO : if is null
    this.assignsList.map((assign, index)=>{
      this._apiVehiclesService.getVehicle(assign.vehicle_id!!).subscribe((data:IVehicle)=> {
        this.vehiclesList.push(data);
    })
  })
  }

getAllData(){
this.getAllAssignsFromApi()
if(this.assignsList){
  this.assignsList.map((assign, index)=>{
    this.clientVehicleList[index]={
            
           id:assign.id,
           id_client:  this.clientsList[index]!.id,
           first_client_name: this.clientsList[index].first_name,
           last_client_name: this.clientsList[index].last_name,
           second_last_client_name: this.clientsList[index].second_last_name,
           client_document: this.clientsList[index].document_number,
            id_vehicle:this.vehiclesList[index].id,
            brand_vehicle: this.vehiclesList[index].brand,
            model_vehicle: this.vehiclesList[index].model,
            plate_vehicle: this.vehiclesList[index].plate,
            date_assignment: assign.date
      }    
  })  
}
}

}


/*

Parece que el problema está relacionado con la asincronía en las llamadas HTTP. Aquí hay algunos puntos clave que podrían ayudarte a solucionar el problema:

Asincronía: Las llamadas HTTP en Angular son asíncronas, lo que significa que this.assignsList podría estar vacío cuando intentas mapearlo en getAllData().
Suscripciones Anidadas: Estás suscribiendo dentro de un map, lo que puede llevar a condiciones de carrera. Considera usar forkJoin o combineLatest para esperar a que todas las llamadas se completen.
Inicialización: Asegúrate de que clientVehicleList se inicialice correctamente después de que todas las llamadas y suscripciones hayan terminado.
Detección de Cambios: Si los datos llegan después de que Angular ha realizado la detección de cambios, necesitarás informar a Angular para que verifique nuevamente. Puedes usar ChangeDetectorRef para esto.
Revisa estos aspectos y ajusta el código para manejar la asincronía adecuadamente. Esto debería ayudar a que clientVehicleList se llene correctamente.

*/