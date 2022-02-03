import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { PointsComponent } from './points/points.component';
import { PickTeamComponent } from './pick-team/pick-team.component';
import { TransfersComponent } from './transfers/transfers.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationService } from './services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    PointsComponent,
    PickTeamComponent,
    TransfersComponent,
    HomescreenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    RouterModule
  ],
  providers: [
    AuthenticationService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
