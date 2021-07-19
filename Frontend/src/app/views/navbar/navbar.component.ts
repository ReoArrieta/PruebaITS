import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public user: boolean = localStorage.getItem('user') ? true : false;
  public username: string = '';

  constructor(private _authService: AuthService) {
    if (this._authService.userData != null) {
      this.username = this._authService.userData.username;
    }
  }

  logout(): void {
    let res = window.confirm('¿Quieres finalizar la sesión?');
    if (res) {
      this._authService.logout();
      this.user = false;
    }
  }
}
