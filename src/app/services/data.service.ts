import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // getMenuOptions(){
  //   return this.http.get<Componente[]>('/assets/data/menu.json')
  // }
}
