import {Component, ViewEncapsulation} from '@angular/core';
import {User} from "./models/user";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'kedi-admin';
  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  showFiller = false;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
