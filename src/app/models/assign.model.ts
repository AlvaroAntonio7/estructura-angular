export interface IAssign{
    id?: string,
    client_id?:string,
    vehicle_id?:string,
    date?:string //TODO : Change to Date object 
}

export interface IAssigned{
    
    id?:string,
    id_client?:string,
    first_client_name?: string,
    last_client_name?: string,
    second_last_client_name?: string,
    client_document?:string,
    id_vehicle?:string,
    brand_vehicle?: string,
    model_vehicle?:string,
    plate_vehicle?:string
    date_assignment?:string//TODO : Change to Date object 
  
}