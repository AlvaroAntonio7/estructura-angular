export interface IClient{
    id?:string,
    first_name?: string,
    last_name?: string,
    second_last_name?:string,  
    document_type?: Document,
    document_number?: string,
    birthday?: string, //TODO : Date type
    gender?: Gender
}

export enum Document{
Card = "ID Card",
Passport = "Passport",
License = "Driver License" 
}

export enum Gender{
    Male = "Male" , 
    Femae= "Female"
}

