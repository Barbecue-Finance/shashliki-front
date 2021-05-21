import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {OutСomeOperationCategory} from '../interfaces/operation-categories/outcome-operation-category.interface';
import {BasicCRUD} from './basic-crud.service';
import {APIControllers} from "../enums/APIControllers";

@Injectable({
  providedIn: 'root'
})
export class OutComeOperationCategoryService extends BasicCRUD<OutСomeOperationCategory> {

  constructor(
    httpClient: HttpClient
  ) {
    super(APIControllers.OutComeOperationCategory, httpClient);
  }

  getByPurse(id: number): Observable<OutСomeOperationCategory[]> {
    return this.httpClient.get<OutСomeOperationCategory[]>(`${environment.apiUrl}/${this.postfix}/GetByPurse`, {
      params: {
        id: id.toString()
      }
    })
  }
}
