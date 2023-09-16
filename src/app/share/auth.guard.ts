import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (this.authService.isLogin()) {
      return true;
    }
    alert('You are not logged in please login'); 
    this.router.navigate(['login']);
    return false;
  }
}
