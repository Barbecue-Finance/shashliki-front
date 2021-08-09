import {Injectable} from '@angular/core';
import GroupDto from "../../../shared/interfaces/group.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {APIControllers} from "../../../shared/enums/APIControllers";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BasicCRUD<GroupDto> {
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
      this._openedGroupId = +(localStorage.getItem(this.key) ?? 0)
    }

    return this._openedGroupId
  }

  set openedGroupId(newGroup: number) {
    this._openedGroupId = newGroup
    localStorage.setItem(this.key, newGroup + '')
  }

  isAnyGroupOpened(): boolean {
    return !!this.openedGroupId && !!localStorage.getItem(this.key)
  }

  getByUser(id: number): Observable<GroupDto[]> {
    return this._httpClient.get<GroupDto[]>(`${environment.apiUrl}/${this.postfix}/getbyuser`, {
      withCredentials: true,
      params: {
        id: id.toString()
      }
    })
  }


}
