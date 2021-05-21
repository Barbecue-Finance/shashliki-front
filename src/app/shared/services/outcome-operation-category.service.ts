import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {OutcomeOperationCategory} from '../interfaces/operation-categories/outcome-operation-category.interface';
import {BasicCRUD} from './basic-crud.service';
import {APIControllers} from "../enums/APIControllers";

@Injectable({
  providedIn: 'root'
})
export class OutComeOperationCategoryService extends BasicCRUD<OutcomeOperationCategory> {

  constructor(
    httpClient: HttpClient
  ) {
    super(APIControllers.OutComeOperationCategory, httpClient);
  }

  getByPurse(id: number): Observable<OutcomeOperationCategory[]> {
    return this.httpClient.get<OutcomeOperationCategory[]>(`${environment.apiUrl}/${this.postfix}/GetByPurse`, {
      params: {
        id: id.toString()
      }
    })
  }
}
