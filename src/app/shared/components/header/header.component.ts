import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../../../modules/categories/services/group.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() HideReport = new EventEmitter<void>();

  canBack = false
  showBackBtn = false

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _groupService: GroupService
  ) {
  }

  ngOnInit(): void {
    if (this._router.url.includes('/create')) {
      this.showBackBtn = true
    }
    if (this._router.url.includes('/profile')) {
      this.showBackBtn = true
    }
    if (this._router.url.includes('/info-category')) {
      this.showBackBtn = true
    }


    this.canBack = this._route.outlet.includes('/report')
  }

  goToGroups(): void {
    this._router.navigate(['/groups'])
  }

  back(): void {
    if (this._router.url.includes('/create')) {
      this._router.navigate(['/groups'])
    } else if (this._router.url.includes('/groups')) {
      this.HideReport.emit()
    } else if (this._router.url.includes('/profile')) {
      this._router.navigate(['/groups'])
    } else if (this._router.url.includes('/info-category')) {
      if (this._groupService.isAnyGroupOpened()) {
        this._router.navigate(['/groups', this._groupService.openedGroupId])
      } else {
        this._router.navigate(['/groups'])
      }
    }
  }

  openProfile() {
    this._router.navigate(['/profile'])
  }
}
