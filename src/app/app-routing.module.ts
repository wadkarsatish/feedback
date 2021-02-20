import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { AuthGuardService } from './auth/authentication.service';
import { LoginComponent } from './components/login/login.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feedback-list',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'feedback-list',
    component: FeedbackListComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always'
  }, {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always'
  }, {
    path: 'feedback/:id',
    component: FeedbackComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
