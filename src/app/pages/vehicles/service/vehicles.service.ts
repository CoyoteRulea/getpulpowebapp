import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Vehicle, VehicleResponse } from '../interfaces/vehicles.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private jsonRequests;

  constructor(private http: HttpClient) {
    this.jsonRequests = JSON.parse(environment.vehiclesRequests);
  }

  postAddVehicle(addForm: any): Observable<VehicleResponse> {
    let thisMethod = 'postAddVehicle';
    let paramsRequest = new HttpParams()
                              .set('vehicle_id',  addForm.vehicle_id)
                              .set('brand',       addForm.brand)
                              .set('model',       addForm.model)
                              .set('color',       addForm.color)
                              .set('status',      addForm.status)
                              .set('assigned',    addForm.assigned)
    return this.http.post<VehicleResponse>(environment.apiUrl + this.jsonRequests[thisMethod], paramsRequest);
  }
  
  postDeleteVehicle(_id: string): Observable<VehicleResponse> {
    let thisMethod = 'postDeleteVehicle';
    let paramsRequest = new HttpParams().set('_id', _id)
    return this.http.post<VehicleResponse>(environment.apiUrl + this.jsonRequests[thisMethod], paramsRequest);
  }
  
  postUpdateVehicle(updateFormValue: any): Observable<VehicleResponse> {
    let thisMethod = 'postUpdateVehicle';
    let paramsRequest = new HttpParams()
                              .set('_id',         updateFormValue._id)
                              .set('vehicle_id',  updateFormValue.vehicle_id)
                              .set('brand',       updateFormValue.brand)
                              .set('model',       updateFormValue.model)
                              .set('color',       updateFormValue.color)
                              .set('status',      updateFormValue.status)
                              .set('assigned',    updateFormValue.assigned)
    return this.http.post<VehicleResponse>(environment.apiUrl + this.jsonRequests[thisMethod], paramsRequest);
  }
  
  postFindByFields(searchFormValue: any): Observable<Vehicle[]> {
    let thisMethod = 'postFindByFields';
    let paramsRequest: HttpParams = new HttpParams();
    if (searchFormValue._id)        paramsRequest = paramsRequest.set('_id',        searchFormValue._id);
    if (searchFormValue.vehicle_id) paramsRequest = paramsRequest.set('vehicle_id', searchFormValue.vehicle_id);
    if (searchFormValue.brand)      paramsRequest = paramsRequest.set('brand',      searchFormValue.brand);
    if (searchFormValue.model)      paramsRequest = paramsRequest.set('model',      searchFormValue.model);
    if (searchFormValue.color)      paramsRequest = paramsRequest.set('color',      searchFormValue.color);
    if (searchFormValue.status)     paramsRequest = paramsRequest.set('status',     searchFormValue.status);
    if (searchFormValue.assigned)   paramsRequest = paramsRequest.set('assigned',   searchFormValue.assigned);
    
    return this.http.post<Vehicle[]>(environment.apiUrl + this.jsonRequests[thisMethod], paramsRequest);
  }

  postVehiclesList(): Observable<Vehicle[]> {
    let thisMethod = 'postFindByFields';

    return this.http.post<Vehicle[]>(environment.apiUrl + this.jsonRequests[thisMethod], { params: null });
  }
}
