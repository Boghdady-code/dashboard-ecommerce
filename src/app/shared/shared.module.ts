import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [SidebarComponent, AlertComponent],
  exports: [SidebarComponent, AlertComponent],
  imports: [CommonModule, SharedRoutingModule],
})
export class SharedModule {}
