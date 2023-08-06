import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AssetsComponent } from './components/assets/assets.component';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { CompanyDetailsComponent } from './components/company/company/company-details/company-details/company-details.component';
import { BuildingDetailsComponent } from './components/building/building/building-details/building-details/building-details.component';
import { RoomDetailsComponent } from './components/room/room-details/room-details/room-details.component';
import { UserTableComponent } from './components/user/user-table/user-table/user-table.component';
import { UserDetailsComponent } from './components/user/user-details/user-details/user-details.component';
import { CompanyComponent } from './components/company/company/company.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user.service';
import { ForbiddenComponent } from './forbidden/forbidden/forbidden.component';
import { DefaultRoles } from './auth/role-defines';
import { LoggedUserDetailsComponent } from './components/user/logged-user-details/logged-user-details/logged-user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CompanyComponent,
    AssetsComponent,
    CompanyDetailsComponent,
    BuildingDetailsComponent,
    RoomDetailsComponent,
    UserTableComponent,
    UserDetailsComponent,
    LoginComponent,
    ForbiddenComponent,
    LoggedUserDetailsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    BrowserAnimationsModule,
    CardModule,
    DataViewModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'assets', component: AssetsComponent },
      { path: 'companies', component: CompanyComponent, canActivate: [AuthGuard], data: { roles: [DefaultRoles.Admin] }  },
      { path: 'companies/companyDetails/:companyId', component: CompanyDetailsComponent, canActivate: [AuthGuard], data: { roles: [DefaultRoles.Admin] } },
      { path: 'companies/companyDetails/:companyId/buildingDetails/:buildingId', component: BuildingDetailsComponent, canActivate: [AuthGuard], data: { roles: [DefaultRoles.Admin] } },
      { path: 'companies/companyDetails/:companyId/buildingDetails/:buildingId/roomDetails/:roomId', component: RoomDetailsComponent, canActivate: [AuthGuard], data: { roles: [DefaultRoles.Admin] } },
      { path: 'users', component: UserTableComponent, canActivate: [AuthGuard], data: { roles: [DefaultRoles.Admin] } },
      { path: 'users/userDetails/:userId/roomDetails/:roomId', component: RoomDetailsComponent, canActivate: [AuthGuard], data: { roles: [DefaultRoles.Admin, DefaultRoles.User] } },
      { path: 'users/userDetails/:userId', component: UserDetailsComponent, canActivate: [AuthGuard], data: { roles: [DefaultRoles.Admin] } },
      { path: 'login', component: LoginComponent },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'profile', component: LoggedUserDetailsComponent, canActivate: [AuthGuard], data: { roles: [DefaultRoles.User] } }
    ])
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
