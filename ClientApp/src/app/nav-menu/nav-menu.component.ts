import { Component } from '@angular/core';
import { UserAuthService } from '../auth/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { DefaultRoles } from '../auth/role-defines';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(private userAuthService: UserAuthService,
    public userService: UserService,
    private router: Router) { }

  public getAdminValue() {
    return DefaultRoles.Admin;
  }

  public getUserValue() {
    return DefaultRoles.User;
  }

  public getAllRoles() {
    return DefaultRoles.AllRoles;
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/'])
  }
}
