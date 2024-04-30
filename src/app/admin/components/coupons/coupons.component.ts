import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent {

  coupons:any;

  constructor(private adminService: AdminService){}

  ngOnInit(){
    this.getCoupons();
  }

  // getCoupons(){
  //   this.adminService.getCoupons().subscribe(res =>{
  //     this.coupons = res;
  //   })
  // }

  getCoupons() {
    this.adminService.getCoupons().subscribe(
      (res) => {
        this.coupons = res;
      },
      (error) => {
        console.error('Error fetching coupons:', error);
        // Handle error here, such as showing a message to the user
      }
    );
  }

}
