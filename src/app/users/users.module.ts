import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { EdituserComponent } from './edituser/edituser.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, EdituserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
