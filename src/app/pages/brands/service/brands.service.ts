import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/brands.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private jsonRequests;
  
  constructor(private http: HttpClient) {
    this.jsonRequests = JSON.parse(environment.brandsRequests);
   }

  getBrands(): Observable<Brand[]> {
    let thisMethod = 'getBrands';
    return this.http.get<Brand[]>(environment.apiUrl + this.jsonRequests[thisMethod])
  }

  postBrandByCode(code: string): Observable<Brand> {
    let thisMethod = 'postBrandByCode';
    let paramsRequest = new HttpParams().set('brand_code', code);
    
    return this.http.post<Brand>(environment.apiUrl + this.jsonRequests[thisMethod], paramsRequest);
  }
}
