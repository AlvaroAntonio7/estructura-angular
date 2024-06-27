import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ApiClientsService {

  private _httpClient = inject(HttpClient)
  private baseURL = 'http://localhost:8080/clients'
  
  //constructor() { }

  public getAllClients():Observable<IClient[]>{
    return  this._httpClient.get<IClient[]>(`${this.baseURL}`);
      }
    
      public getClient(id: String):Observable<IClient> {
        return this._httpClient.get<IClient>(`${this.baseURL}/${id}`);
      }
      
      public createClient(client: IClient):Observable<IClient>{
        return this._httpClient.post(`${this.baseURL}`, client)
      }

      public deleteClient(id: string):Observable<any>{
        return this._httpClient.delete(`${this.baseURL}/${id}`)
      }
    
      public updateCñient(vehicle: IClient): Observable<IClient>{
        return this._httpClient.put(`${this.baseURL}`, vehicle)
      }
    
}
