import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IncomeOutcome } from '../interfaces/income-outcome.interface';
import {Invite} from "../interfaces/invite.interface";
import {IncomeMoneyOperation} from "../interfaces/money-operations/income-money-operation.interface";
import {OutComeMoneyOperation} from "../interfaces/money-operations/outcome-money-operation.interface";
import {TransferOperation} from "../interfaces/money-operations/transfer.operation";
import {APIControllers} from "../enums/APIControllers";

@Injectable({
  providedIn: 'root'
})
export class MoneyOperationService {

  postfix: string = APIControllers.MoneyOperation

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

  updateIncome(operation: IncomeMoneyOperation): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/UpdateIncome`, operation)
  }

  updateOutcome(operation: OutComeMoneyOperation): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/UpdateOutCome`, operation)
  }

  createIncome(operation: IncomeMoneyOperation): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/CreateIncome`, operation)
  }

  createOutCome(operation: IncomeMoneyOperation): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/CreateIncome`, operation)
  }

  createTransfer(operation: TransferOperation): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/CreateTransfer`, operation)
  }
}
