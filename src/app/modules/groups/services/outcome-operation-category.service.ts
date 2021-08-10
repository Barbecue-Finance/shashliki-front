import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {OutcomeOperationCategory} from '../../../shared/interfaces/operation-categories/outcome-operation-category.interface';
import {BasicCRUD} from '../../../shared/services/basic-crud.service';
import {APIControllers} from "../../../shared/enums/APIControllers";
import {map} from "rxjs/operators";
import {GroupService} from "./group.service";

@Injectable({
  providedIn: 'root'
})
export class OutcomeOperationCategoryService extends BasicCRUD<OutcomeOperationCategory> {
  private _currentOutcomeOperationCategories: OutcomeOperationCategory[] = []

  constructor(
    httpClient: HttpClient,
    private _groupService: GroupService
  ) {
    super(APIControllers.OutcomeOperationCategory, httpClient);
  }

  get currentOutcomeOperationCategories(): OutcomeOperationCategory[] {
    return this._currentOutcomeOperationCategories;
  }

  set currentOutcomeOperationCategories(value: OutcomeOperationCategory[]) {
    this._currentOutcomeOperationCategories = value;
  }

  getByPurse(id: number): Observable<OutcomeOperationCategory[]> {
    return this.httpClient.get<OutcomeOperationCategory[]>(`${environment.apiUrl}/${this.postfix}/GetByPurse`, {
      withCredentials: true,
      params: {
        id: id.toString()
      }
    })
  }

  loadCurrentOutcomeOperationCategories(): Observable<void> {
    return this.getByPurse(this._groupService.group.purseId)
      .pipe(
        map((result) => {
            this._currentOutcomeOperationCategories = result;
          }
        )
      )
  }
}
