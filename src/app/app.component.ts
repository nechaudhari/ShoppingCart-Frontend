import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShoppersZone';

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  isVendorLoggedIn: boolean = UserStorageService.isVendorLoggedIn();

  constructor(private router: Router) {}

  ngOnInit():void {
    this.router.events.subscribe(event  => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isVendorLoggedIn = UserStorageService.isVendorLoggedIn();
    });
  }

  logOut(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
