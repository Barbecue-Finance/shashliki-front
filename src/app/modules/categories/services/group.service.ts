import {Injectable} from '@angular/core';
import {IGroup} from "../../../shared/interfaces/group.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {APIControllers} from "../../../shared/enums/APIControllers";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BasicCRUD<IGroup> {
  private _openedGroupId: number;

  private readonly key = 'openedGroupId'

  constructor(
    private _httpClient: HttpClient
  ) {
    super(APIControllers.Group, _httpClient)

    this._openedGroupId = 0
  }

  get openedGroupId(): number {
    if (!this._openedGroupId) {
      // @ts-ignore
      this._openedGroupId = +localStorage.getItem(this.key)
    }

    return this._openedGroupId
  }

  set openedGroupId(newGroup) {
    this._openedGroupId = newGroup
    localStorage.setItem(this.key, newGroup + '')
  }

  isAnyGroupOpened(): boolean {
    return !!this.openedGroupId && !!localStorage.getItem(this.key)
  }

  getByUser(id: number): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/${this.postfix}/getbyuser`, {
      withCredentials: true,
      params: {
        id: id.toString()
      }
    })
  }


}
