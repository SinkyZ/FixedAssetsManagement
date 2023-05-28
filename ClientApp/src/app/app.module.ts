import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { CompanyComponent } from './components/company/company/company.component';
import { CardModule } from 'primeng/card';
import { BuildingComponent } from './components/building/building/building.component';
import { CompanyDetailsComponent } from './components/company/company/company-details/company-details/company-details.component';
import { BuildingDetailsComponent } from './components/building/building/building-details/building-details/building-details.component';
import { RoomDetailsComponent } from './components/room/room-details/room-details/room-details.component';
import { UserTableComponent } from './components/user/user-table/user-table/user-table.component';
import { UserDetailsComponent } from './components/user/user-details/user-details/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AssetsComponent,
    CompanyComponent,
    BuildingComponent,
    CompanyDetailsComponent,
    BuildingDetailsComponent,
    RoomDetailsComponent,
    UserTableComponent,
    UserDetailsComponent,
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
      { path: 'companies', component: CompanyComponent },
      { path: 'companies/companyDetails/:companyId', component: CompanyDetailsComponent },
      { path: 'companies/companyDetails/:companyId/buildingDetails/:buildingId', component: BuildingDetailsComponent },
      { path: 'companies/companyDetails/:companyId/buildingDetails/:buildingId/roomDetails/:roomId', component: RoomDetailsComponent },
      { path: 'users', component: UserTableComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
