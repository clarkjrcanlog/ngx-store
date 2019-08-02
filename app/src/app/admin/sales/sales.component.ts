import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@core/services/auth.service';
import { NbDialogService } from '@nebular/theme';
import { ViewSalesComponent } from './view-sales/view-sales.component';
@Component({
  selector: 'ngx-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  salesCollect: any = [];
  totalSales: 0;
  names: string[] = [];
  constructor(private authService: AuthService,
    private dialogService: NbDialogService) { }

  ngOnInit() {this.refreshSalesList()
  }

  refreshSalesList(){
    this.authService.getSaleList().subscribe((res) => {
      this.salesCollect = res;
      this.totalSales = 0;
      this.salesCollect.forEach(e => {
        this.totalSales += e.totalPrice;
      })
      console.log(this.totalSales);
    });
  }

  viewSales(sale){
    this.dialogService.open(ViewSalesComponent)
      .onClose.subscribe(name => name && this.names.push(name));
      this.dialogService.varContainer = sale;
  }

}
