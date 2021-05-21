import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purse } from '../interfaces/purse.interface';
import {APIControllers} from "../enums/APIControllers";

@Injectable({
  providedIn: 'root'
})
export class PurseService {

  postfix: string = APIControllers.Purse

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  getById(id: number): Observable<Purse> {
    return this._httpClient.get<Purse>(`${environment.apiUrl}/${this.postfix}/GetById`, {
      params: {
        id: id.toString()
      }
    })
  }

  getByGroup(id: number): Observable<Purse> {
    return this._httpClient.get<Purse>(`${environment.apiUrl}/${this.postfix}/GetByGroup`, {
      params: {
        id: id.toString()
      }
    })
  }
}
