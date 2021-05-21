import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createWebpackLoggingCallback} from "@angular-devkit/build-angular/src/webpack/utils/stats";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _openedCategoryId: number
  private _openedCategoryType: string
  private readonly keyId = 'openedCategoryId'
  private readonly keyType = 'openedCategoryType'

  constructor(
    private _httpClient: HttpClient
  ) {
    this._openedCategoryId = 0
    this._openedCategoryType = ''
  }

  get openedCategoryId(): number {
    if (!this._openedCategoryId) {
      // @ts-ignore
      this._openedCategoryId = +localStorage.getItem(this.keyId)
    }
    return this._openedCategoryId
  }

  set openedCategoryId(newId) {
    this._openedCategoryId = newId
    localStorage.setItem(this.keyId, newId + '')
  }

  get openedCategoryType(): string {
    if (!this._openedCategoryType) {
      // @ts-ignore
      this._openedCategoryType = +localStorage.getItem(this.keyType)
    }
    return this._openedCategoryType
  }

  set openedCategoryType(type: string) {
    this._openedCategoryType = type
    localStorage.setItem(this.keyType, type)
  }

  isAnyCategoryOpened(): boolean {
    return !!this._openedCategoryId && !!localStorage.getItem(this.keyId)
  }

  killActiveCategory() {
    this.openedCategoryId = 0
    this.openedCategoryType = ''
  }
}
