import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IncomeOutcome } from '../interfaces/income-outcome.interface';

@Injectable({
  providedIn: 'root'
})
export class MoneyOperationService {

  postfix: string = 'MoneyOperation'

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  getByPurse(id: number): Observable<IncomeOutcome> {
    return this._httpClient.get<IncomeOutcome>(`${environment.apiUrl}/${this.postfix}/GetByPurse`, {
      params: {
        id: id.toString()
      }
    })
  }
}
