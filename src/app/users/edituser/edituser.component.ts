import { Component, Input, OnInit } from '@angular/core';
import { EdituserService } from './edituser.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.scss',
})
export class EdituserComponent implements OnInit {
  mode = ' ';
  id: number | undefined;
  editallForm: FormGroup | undefined;
  createForm: FormGroup | undefined;
  user: any | undefined;

  constructor(
    private editService: EdituserService,
    private alert: AlertService
  ) {}

  close() {
    this.editService.modalStatus.next(false);
  }

  updateUser() {
    console.log(this.editallForm?.value);
    this.editService
      .updateUser(this.id, this.editallForm?.value)
      .subscribe((res) => {
        console.log(res);
        this.alert.success.next('User has been updated successfully');
      });
  }

  createUser() {
    console.log(this.createForm?.value);
    this.editService.createUser(this.createForm?.value).subscribe((res) => {
      console.log(res);
      this.alert.success.next('User has been created successfully');
    });
  }

  initForm() {
    if (this.mode == 'edit') {
      this.editallForm = new FormGroup({
        name: new FormControl(this.user.name),
        email: new FormControl(this.user.email),
        role: new FormControl(this.user.role),
      });
    }
  }

  ngOnInit(): void {
    this.editallForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl(null, [Validators.required]),
    });

    this.createForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });

    this.mode = this.editService.mode;

    console.log(this.mode);
    this.id = this.editService.userId;
    if (this.mode == 'edit') {
      this.editService.getUser(this.id).subscribe((res) => {
        this.user = res.data;

        this.initForm();
      });
    }
  }
}
