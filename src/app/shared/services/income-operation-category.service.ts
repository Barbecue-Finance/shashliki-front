import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IncomeOperationCategory } from '../interfaces/operation-categories/income-operation-category.interface';
import { BasicCRUD } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeOperationCategoryService extends BasicCRUD<IncomeOperationCategory> {

  postfix: string = 'IncomeOperationCategory'

  constructor(
    httpClient: HttpClient
  ) {
    super('OperationCategory', httpClient);
  }

  getByPurse(id: number): Observable<IncomeOperationCategory[]> {
    return this.httpClient.get<IncomeOperationCategory[]>(`${environment.apiUrl}/${this.postfix}/GetByPurse`, {
      params: {
        id: id.toString()
      }
    })
  }
}
