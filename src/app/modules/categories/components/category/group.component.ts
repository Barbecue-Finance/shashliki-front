import {Component, Input, OnInit} from '@angular/core';
import {IGroup} from "../../../../shared/interfaces/group.interface";
import {GroupService} from "../../services/group.service";
import {Router} from "@angular/router";
import {Observable, Subject, Subscription} from "rxjs";
import {CalendarService} from "../../../../shared/services/calendar.service";

@Component({
  selector: 'app-category',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent implements OnInit {

  private calendarString: string

  isHidden = true

  group: IGroup

  openedReport: Subject<void> = new Subject<void>()
  closedReport: Subject<void> = new Subject<void>()

  constructor(
    private _groupsService: GroupService,
    private _calendarService: CalendarService,
    private _router: Router
  ) {
    this.group = {
      id: 0,
      title: '',
      users: []
    }
    this.calendarString = ''
  }


  ngOnInit(): void {
    if (!this._groupsService.isAnyGroupOpened()) {
      this._router.navigate(['/groups'])
    }

    this._groupsService.getById(this._groupsService.openedGroupId)
      .subscribe((response: IGroup) => {
        this.group = response
      })
  }

  getMembersString(): string {
    let endSym = this.group.users.length % 10

    let word: string;

    switch (endSym) {
      case 1:
        word = 'участник'
        break

      case 2:
      case 3:
      case 4:
        word = 'участника'
        break

      default:
        word = 'участников'
        break
    }

    return `${this.group.users.length} ${word}`
  }

  openReport(): void {
    this.isHidden = false
    this.openedReport.next()
  }

  hideReport(): void {
    this.isHidden = true
    this.closedReport.next()
  }

  get calendar(): string {
    return this.calendarString
  }
  set calendar(newString) {
    this.calendarString = newString
  }

  loadCalendarString(): void {
    this.calendarString = this._calendarService.generatePointDate()
  }
}
