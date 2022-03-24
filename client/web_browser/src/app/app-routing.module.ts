import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointsComponent } from '../app/points/points.component';
import { PickTeamComponent } from '../app/pick-team/pick-team.component'
import { TransfersComponent } from '../app/transfers/transfers.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: 'points', component: PointsComponent },
  { path: 'pick-team', component: PickTeamComponent },
  { path: 'transfers', component: TransfersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
