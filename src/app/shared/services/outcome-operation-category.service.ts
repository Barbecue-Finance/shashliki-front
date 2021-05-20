import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OutComeOperationCategory } from '../interfaces/operation-categories/outcome-operation-category.interface';
import { BasicCRUD } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class OutComeOperationCategoryService extends BasicCRUD<OutComeOperationCategory> {

  postfix: string = 'OutComeOperationCategory'

  constructor(
    httpClient: HttpClient
  ) {
    super('OutComeOperationCategory', httpClient);
  }

  getByPurse(id: number): Observable<OutComeOperationCategory[]> {
    return this.httpClient.get<OutComeOperationCategory[]>(`${environment.apiUrl}/${this.postfix}/GetByPurse`, {
      params: {
        id: id.toString()
      }
    })
  }
}
