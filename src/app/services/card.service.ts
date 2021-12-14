import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Card } from '../models/card';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  endpoint: string = `https://paymentapiheroku-duvansanjaya.herokuapp.com/api/payment`;

  constructor(private http: HttpClient) { }

  postUser(data: any)
  {
    return this.http.post<any>(this.endpoint, data).pipe(map((res: any)=>{return res}))
  }

  getData()
  {
    return this.http.get<any>(this.endpoint).pipe(map((res:any)=>{return res}))
  }

  updateData(data: any, id: number)
  {
    return this.http.put<any>(this.endpoint+"/"+id, data).pipe(map((res:any)=>{return res}))
  }

  deleteData(id: number)
  {
    return this.http.delete<any>(this.endpoint+"/"+id).pipe(map((res:any)=>{return res}))
  }
}
