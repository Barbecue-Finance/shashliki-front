import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {IncomeOperationCategory} from '../../../shared/interfaces/operation-categories/income-operation-category.interface';
import {BasicCRUD} from '../../../shared/services/basic-crud.service';
import {APIControllers} from "../../../shared/enums/APIControllers";
import {GroupService} from "./group.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IncomeOperationCategoryService extends BasicCRUD<IncomeOperationCategory> {
  private _currentIncomeOperationCategories: IncomeOperationCategory[] = []

  constructor(
    private _httpClient: HttpClient,
    private _groupService: GroupService
  ) {
    super(APIControllers.IncomeOperationCategory, _httpClient);
  }

  get currentIncomeOperationCategories(): IncomeOperationCategory[] {
    return this._currentIncomeOperationCategories;
  }

  set currentIncomeOperationCategories(value: IncomeOperationCategory[]) {
    this._currentIncomeOperationCategories = value;
  }

  getByPurse(id: number): Observable<IncomeOperationCategory[]> {
    return this._httpClient.get<IncomeOperationCategory[]>(`${environment.apiUrl}/${this.postfix}/GetByPurse`, {
      withCredentials: true,
      params: {
        id: id.toString()
      }
    })
  }

  loadCurrentIncomeOperationCategories(): Observable<void> {
    return this.getByPurse(this._groupService.group.purseId)
      .pipe(
        map((result) => {
            this._currentIncomeOperationCategories = result;
          }
        )
      )
  }
}
