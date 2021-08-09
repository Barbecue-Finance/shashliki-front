import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {IncomeOutcomeDto} from '../../../shared/interfaces/dto/income-outcome-dto.interface';
import {IncomeMoneyOperation} from "../../../shared/interfaces/money-operations/income-money-operation.interface";
import {OutcomeMoneyOperation} from "../../../shared/interfaces/money-operations/outcome-money-operation.interface";
import {TransferOperation} from "../../../shared/interfaces/money-operations/transfer.operation";
import {APIControllers} from "../../../shared/enums/APIControllers";
import {GroupService} from "./group.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: null
})
export class MoneyOperationService {
  postfix: string = APIControllers.MoneyOperation

  private _currentPurseOperations!: IncomeOutcomeDto;

  constructor(
    private _httpClient: HttpClient,
    private _groupService: GroupService
  ) {
  }

  get currentPurseOperations(): IncomeOutcomeDto {
    return this._currentPurseOperations;
  }

  set currentPurseOperations(value: IncomeOutcomeDto) {
    this._currentPurseOperations = value;
  }

  getByPurse(id: number): Observable<IncomeOutcomeDto> {
    return this._httpClient.get<IncomeOutcomeDto>(`${environment.apiUrl}/${this.postfix}/GetByPurse`, {
      withCredentials: true,
      params: {
        id: id.toString()
      }
    })
  }

  updateIncome(operation: IncomeMoneyOperation): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/UpdateIncome`, operation, {
      withCredentials: true,
    })
  }

  updateOutcome(operation: OutcomeMoneyOperation): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/UpdateOutCome`, operation, {
      withCredentials: true,
    })
  }

  createIncome(operation: IncomeMoneyOperation): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/CreateIncome`, operation, {
      withCredentials: true,
    })
  }

  createOutCome(operation: OutcomeMoneyOperation): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/CreateOutCome`, operation, {
      withCredentials: true,
    })
  }

  createTransfer(operation: TransferOperation): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/CreateTransfer`, operation, {
      withCredentials: true,
    })
  }

  loadCurrentPurseOperations(): Observable<void> {
    return this.getByPurse(this._groupService.group.purseId).pipe(
      map((result) => {
        this._currentPurseOperations = result;
      })
    )
  }
}
