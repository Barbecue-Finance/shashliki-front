import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createWebpackLoggingCallback} from "@angular-devkit/build-angular/src/webpack/utils/stats";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _openedCategoryId: number
  private _opnedCategoryType: string
  private readonly keyId = 'openedCategoryId'
  private readonly keyType = 'openedCategoryType'

  constructor(
    private _httpClient: HttpClient
  ) {
    this._openedCategoryId = 0
    this._opnedCategoryType = ''
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
    if (!this._opnedCategoryType) {
      // @ts-ignore
      this._opnedCategoryType = +localStorage.getItem(this.keyType)
    }
    return this._opnedCategoryType
  }

  set openedCategoryType(type: string) {
    this._opnedCategoryType = type
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
