import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppService } from './../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly appService: AppService,
    private readonly router: Router
  ) { }

  canActivate(): boolean {
    if (!this.appService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}