import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Contants } from './constants';
import { EmployeeRoleEnum } from './models/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  role = EmployeeRoleEnum;

  constructor(
    public readonly appService: AppService,
    private readonly router: Router
  ) { }

  newFeedback() {
    this.router.navigate(['feedback']);
  }

  list(): void {
    this.router.navigate(['feedback-list']);
  }

  logout(): void {
    localStorage.removeItem(Contants.USER);
    this.router.navigate(['']);
  }
}
