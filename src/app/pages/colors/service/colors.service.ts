import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../interfaces/colors.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private jsonRequests;
  
  constructor(private http: HttpClient) {    
    this.jsonRequests = JSON.parse(environment.colorsRequests);
   }

  getColors(): Observable<Color[]> {
    let thisMethod = 'getColors';
    return this.http.get<Color[]>(environment.apiUrl + this.jsonRequests[thisMethod]);
  }

  postColorByCode(code: string): Observable<Color> {
    let thisMethod = 'postColorByCode';
    let paramsRequest = new HttpParams().set('color_code', code);
    
    return this.http.post<Color>(environment.apiUrl + this.jsonRequests[thisMethod], paramsRequest);
  }
}
