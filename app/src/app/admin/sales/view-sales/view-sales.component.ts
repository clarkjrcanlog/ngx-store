import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.scss']
})
export class ViewSalesComponent implements OnInit {
  sale: any;
  saleItems: any = [];
  constructor(protected ref: NbDialogRef<ViewSalesComponent>,
    public NbDialogService: NbDialogService
    ) { }

  ngOnInit() {
    this.sale = this.NbDialogService.varContainer;
    // this.sale.forEach(e =>{
    //   this.saleItems.push(e.items.itemName)
    // })
    console.log(this.sale.items);

  }

  cancel() {
    this.ref.close();
  }

  submit(){
    this.ref.close();
  }
}
