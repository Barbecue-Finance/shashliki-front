import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {loginDTO} from "../interfaces/dto/login-dto.interface";
import {APIControllers} from "../enums/APIControllers";
import {IUser} from "../interfaces/user.interface";
import {BasicCRUD} from "./basic-crud.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BasicCRUD<any> {
  postfix: string;
  private _token = '';
  private _id = 0;

  constructor(
    private _httpClient: HttpClient,
    private router: Router
  ) {
    super(APIControllers.User, _httpClient);
    this.postfix = APIControllers.User;
  }

  set token(token: string) {
    this._token = token;
    localStorage.setItem('token', this._token);
  }

  get token(): string {
    if (!this._token) {
      this._token = localStorage.getItem('token') + '';
    }
    return this._token;
  }

  get id(): number {
    if (!this._id) {
      this._id = +(localStorage.getItem('id') + '');
    }
    return this._id
  }

  set id(newId) {
    this._id = newId
    localStorage.setItem('id', this._id + '')
  }


  login(loginData: loginDTO): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/login`, loginData, {withCredentials: true})
      .pipe(
        map((response: any) => {
          if (response?.token) {
            this.token = response.token;
            this.id = response.id
          }
        })
      );
  }

  update(element: IUser): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/Update`, element)
  }


  getById(id: number): Observable<IUser> {
    return this._httpClient.get<IUser>(`${environment.apiUrl}/${this.postfix}/GetById`, {
      params: {
        id: id.toString()
      }
    })
  }

  getByGroup(id: number): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(`${environment.apiUrl}/${this.postfix}/GetByGroup`, {
      params: {
        id: id.toString()
      }
    })
  }

  logout(): void {
    this._httpClient.get(`${environment.apiUrl}/${this.postfix}/logout`)
      .subscribe(() => {
        this.killLocalStorage();
        this.router.navigate(['/auth']);
      });
  }

  isLoggedIn(): boolean {
    // return (!!this.token || localStorage.getItem('token') !== null) && (!!this.id || localStorage.getItem('id') === null);
    return !!this.token && !!this.id
  }

  private killLocalStorage() {
    this.killToken();
    this.killCategory();
    this.tasks();
    this.killOpenedGroupId();
  }

  killToken(): void {
    this.token = '';
    this.id = 0;
  }

  private killCategory() {
    localStorage.removeItem('openedCategoryId');
    localStorage.removeItem('openedCategoryType');
  }

  private tasks() {
    localStorage.removeItem('tasks');
  }

  private killOpenedGroupId() {
    localStorage.setItem('openedGroupId', '0');
  }

  authPageEntered() {
    if (this.isLoggedIn()) this.killLocalStorage();
  }
}
