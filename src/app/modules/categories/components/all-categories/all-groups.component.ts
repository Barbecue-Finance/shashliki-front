import {Component, OnInit} from '@angular/core';
import {IGroup} from "../../../../shared/interfaces/group.interface";
import {GroupService} from "../../services/group.service";
import {AccountService} from "../../../../shared/services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.sass']
})
export class AllGroupsComponent implements OnInit {

  groups: IGroup[];

  iter: number[] = [15];

  constructor(
    private _router: Router,
    private _groupsService: GroupService,
    private _accountService: AccountService
  ) {
    this.groups = [];
  }

  ngOnInit(): void {
    this.loadGroups()
  }

  loadGroups(): void {
    this._groupsService.loadGroups(this._accountService.id)
      .subscribe((groups: IGroup[]) => {
        this.groups = groups
      })
  }

  openGroup(groupId: number): void {
    this._groupsService.openedGroupId = groupId
    this._router.navigate(['/groups', groupId + ''])
  }

}
