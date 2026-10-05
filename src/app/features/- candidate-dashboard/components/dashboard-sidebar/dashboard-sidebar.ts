import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
@Component({
  selector: 'app-dashboard-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.scss',
})
export class DashboardSidebar {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }


}
