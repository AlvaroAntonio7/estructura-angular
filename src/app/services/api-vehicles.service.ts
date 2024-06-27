import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class ApiVehiclesService {

  private _httpClient = inject(HttpClient)
  private baseURL = 'http://localhost:8080/vehicles'

  //constructor(private _httpClient: HttpClient) { }


  public getAllVehicles(): Observable<IVehicle[]>{
    return this._httpClient.get<IVehicle[]>(`${this.baseURL}`)
   }

   public getVehicle(id: String):Observable<IVehicle> {
    return this._httpClient.get<IVehicle>(`${this.baseURL}/${id}`);
  }

  public createVehicle(vehicle: IVehicle):Observable<IVehicle>{
    return this._httpClient.post(`${this.baseURL}`, vehicle)
    //console.log(vehicle)
  }

  public deleteVehicle(id: string):Observable<any>{
    return this._httpClient.delete(`${this.baseURL}/${id}`)
  }

  public updateVehicle(vehicle: IVehicle): Observable<IVehicle>{
    return this._httpClient.put(`${this.baseURL}`, vehicle)
  }

}
