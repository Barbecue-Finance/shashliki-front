import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"

export abstract class BasicCRUD<TParam> {

  // This is a simple abstract class which implements all basic CRUD methods

  protected constructor(
    protected postfix: string,
    protected httpClient: HttpClient
  ) {
  }


  getAll(): Observable<TParam[]> {
    return this.httpClient.get<TParam[]>(`${environment.apiUrl}/${this.postfix}/GetAll`)
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/${this.postfix}/Create`, data)
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/${this.postfix}/Remove`, {
      params: {
        id: id.toString(),
      }
    })
  }

  getById(id: number): Observable<TParam> {
    return this.httpClient.get<TParam>(`${environment.apiUrl}/${this.postfix}/GetById`, {
      params: {
        id: id.toString()
      }
    })
  }

  update(element: TParam): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/${this.postfix}/Update`, element)
  }

}
