import {Component, OnInit} from '@angular/core';
import {IGroup} from "../../../../shared/interfaces/group.interface";
import {GroupService} from "../../services/group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent implements OnInit {

  isHidden = true

  group: IGroup

  constructor(
    private _groupsService: GroupService,
    private _router: Router
  ) {
    this.group = {
      id: 0,
      title: '',
      users: []
    }
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

  //TODO finish generation

  // getExpensesString(): string {
  //   let sum = calcExpenses();
  //   let res = ''
  //
  //   //,00
  //   if (sum !== Math.round(sum)) {
  //     sum *= 100
  //     Math.round(sum)
  //
  //     sum = ~~sum
  //
  //     res.concat((sum % 100) + '')
  //     sum /= 100
  //   }
  // }

  // calcExpenses(): number {

  // }

  openReport(): void {
    this.isHidden = false
  }

  hideReport(): void {
    this.isHidden = true
  }
}
