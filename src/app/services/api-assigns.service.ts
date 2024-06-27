import { Injectable, inject } from '@angular/core';
import { IAssign } from '../models/assign.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAssignsService {

  private _httpClient = inject(HttpClient);
  private baseURL = 'http://localhost:8080/assigns';

  getAllAssigns(): Observable<IAssign[]>{
    return this._httpClient.get<IAssign[]>(`${this.baseURL}`);
  }

  getAssign(id:string): Observable<IAssign>{
    return this._httpClient.get<IAssign>(`${this.baseURL}/${id}`)
  }

  public createAssign(assign: IAssign){
    this._httpClient.post(`${this.baseURL}`, assign)
  }
}
