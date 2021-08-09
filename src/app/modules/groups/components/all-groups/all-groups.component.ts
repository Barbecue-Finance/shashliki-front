import {Component, OnInit} from '@angular/core';
import GroupDto from "../../../../shared/interfaces/group.interface";
import {GroupService} from "../../services/group.service";
import {UserService} from "../../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.sass']
})
export class AllGroupsComponent implements OnInit {

  groups: GroupDto[];

  constructor(
    private _router: Router,
    private _groupsService: GroupService,
    private _userService: UserService
  ) {
    this.groups = [];
  }

  ngOnInit(): void {
    this.loadGroups()
  }

  loadGroups(): void {
    this._groupsService.getByUser(this._userService.id)
      .subscribe((groups: GroupDto[]) => {
        this.groups = groups
      })
  }

  openGroup(groupId: number): void {
    this._groupsService.openedGroupId = groupId
    this._router.navigate(['groups', groupId.toString()])
  }

  createGroupMenu() {
    this._router.navigate(['groups', 'create'])
  }
}
