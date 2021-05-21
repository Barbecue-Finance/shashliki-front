import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() HideReport = new EventEmitter<void>();

  canBack = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.canBack = this._route.outlet.includes('/report')
  }

  goToGroups(): void {
    this._router.navigate(['/groups'])
  }

  back(): void {
    if (this._router.url.includes('/groups/')) {
      this.HideReport.emit()
    } else if (this._router.url.includes('/profile')) {
      this._router.navigate(['/groups'])
    }
  }

  openProfile() {
    this._router.navigate(['/profile'])
  }
}
