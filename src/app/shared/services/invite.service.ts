import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Invite} from "../interfaces/invite.interface";
import {APIControllers} from "../enums/APIControllers";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  postfix: string = APIControllers.Invite

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  getById(id: number): Observable<Invite> {
    return this._httpClient.get<Invite>(`${environment.apiUrl}/${this.postfix}/GetById`, {
      params: {
        id: id.toString()
      }
    })
  }

  update(invite: Invite): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/Update`, invite)
  }

  create(invite: Invite): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/Create`, invite)
  }

  accept(id: number): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/${this.postfix}/Accept`, {
      params: {
        id: id.toString()
      }
    })
  }

  reject(id: number): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/${this.postfix}/Reject`, {
      params: {
        id: id.toString()
      }
    })
  }

  cancel(id: number): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/${this.postfix}/Cancel`, {
      params: {
        id: id.toString()
      }
    })
  }

  getIssued(id: number): Observable<Invite[]> {
    return this._httpClient.get<Invite[]>(`${environment.apiUrl}/${this.postfix}/GetIssued`, {
      params: {
        id: id.toString()
      }
    })
  }

  getReceived(id: number): Observable<Invite[]> {
    return this._httpClient.get<Invite[]>(`${environment.apiUrl}/${this.postfix}/GetReceived`, {
      params: {
        id: id.toString()
      }
    })
  }

  getByGroup(id: number): Observable<Invite[]> {
    return this._httpClient.get<Invite[]>(`${environment.apiUrl}/${this.postfix}/GetReceived`, {
      params: {
        id: id.toString()
      }
    })
  }
}
