import { Routes } from '@angular/router';
import { VehiclesListComponent } from './pages/vehicles/vehicles-list/vehicles-list.component';
import { VehiclesDetailComponent } from './pages/vehicles/vehicles-detail/vehicles-detail.component';
import { ClientsListComponent } from './pages/clients/clients-list/clients-list.component';
import { ClientsDetailComponent } from './pages/clients/clients-detail/clients-detail.component';
import { AssignsListComponent } from './pages/assigns/assigns-list/assigns-list.component';
import { AssignsDetailComponent } from './pages/assigns/assigns-detail/assigns-detail.component';

export const routes: Routes = [
    {path:'', redirectTo:'vehicles', pathMatch:'full'},
    {path:'vehicles', component:VehiclesListComponent},
    {path:'vehicles/:vehicleId', component:VehiclesDetailComponent},
    {path:'clients', component:ClientsListComponent},
    {path:'clients/:clientsId', component:ClientsDetailComponent},
    {path:'assigns', component:AssignsListComponent},
    {path:'assgns/:assignsId', component:AssignsDetailComponent},
    {path:'**',  redirectTo:'vehicles', pathMatch:'full'}
];
