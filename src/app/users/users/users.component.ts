import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { EdituserService } from '../edituser/edituser.service';
import { AlertService } from '../../shared/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  users: any[] | undefined;
  totalUsers: number | undefined;
  modalStatus: boolean = false;
  userSub: Subscription | undefined;

  constructor(
    private usersService: UsersService,
    private editService: EdituserService,
    private alert: AlertService
  ) {}

  onPageChange(event: any) {
    this.usersService
      .getUsers({ limit: 10, page: event.pageIndex + 1 })
      .subscribe((res) => {
        this.users = res.data;
      });
  }

  editUser(id: any) {
    this.editService.openModal();
    this.editService.mode = 'edit';

    this.editService.setUserId(id);
  }
  createUser() {
    this.editService.openModal();

    this.editService.mode = 'new';
  }

  deleteUser(id: any) {
    this.usersService.deleteUser(id).subscribe((res) => {
      window.location.reload();
      this.alert.success.next('User deleted successfully');
    });
  }

  ngOnInit(): void {
    this.userSub = this.usersService
      .getUsers({ limit: 10 })
      .subscribe((res) => {
        this.users = res.data;
        console.log(this.users);

        this.totalUsers = res.paginationResult.totalDocuments;
      });

    this.editService.modalStatus.subscribe((res) => {
      this.modalStatus = res;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
