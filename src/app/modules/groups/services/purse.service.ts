import {APIControllers} from "../../../shared/enums/APIControllers";
import {GroupModule} from "../group.module";
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PurseDto} from '../../../shared/interfaces/purse.interface';
import {environment} from 'src/environments/environment';
import {GroupService} from "./group.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PurseService {
  postfix: string = APIControllers.Purse

  private _currentPurse!: PurseDto;

  constructor(
    private _httpClient: HttpClient,
    private _groupService: GroupService
  ) {
  }


  get currentPurse(): PurseDto {
    return this._currentPurse;
  }

  set currentPurse(value: PurseDto) {
    this._currentPurse = value;
  }

  getById(id: number): Observable<PurseDto> {
    return this._httpClient.get<PurseDto>(`${environment.apiUrl}/${this.postfix}/GetById`, {
      withCredentials: true,
      params: {
        id: id.toString()
      }
    })
  }

  getByGroup(id: number): Observable<PurseDto> {
    return this._httpClient.get<PurseDto>(`${environment.apiUrl}/${this.postfix}/GetByGroup`, {
      withCredentials: true,
      params: {
        id: id.toString()
      }
    })
  }


  loadCurrentPurse(): Observable<void> {
    return this.getByGroup(this._groupService.openedGroupId)
      .pipe(
        map((purse) => {
          this._currentPurse = purse;
        })
      )
  }
}
