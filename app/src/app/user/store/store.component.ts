import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@core/services/auth.service';
import { NbDialogService } from '@nebular/theme';

import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

@Component({
  selector: 'ngx-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  itemsCollect: any = [];
  names: string[] = [];
  addedToCart: any = [];
  total: 0;

  constructor(private authService: AuthService,
    private dialogService: NbDialogService) { }

  ngOnInit() {this.refreshItemList()
  }

  refreshItemList(){
    this.authService.getItemList().subscribe((res) => {
      this.itemsCollect = res;

      this.itemsCollect = this.itemsCollect.filter(e => {
        e.selected = false;
        return e.status === true;
      })

    });
  }

  addToCartModal(item){
    this.dialogService.open(AddToCartComponent)
      .onClose.subscribe(addToCart => {
        addToCart && this.addedToCart.push(addToCart)
        console.log(this.addedToCart);
        this.total = 0;
        this.addedToCart.forEach(e => {
          this.total += e.subTotal;
        })
        console.log(this.total);
      });

      this.dialogService.varContainer = item;
  }

  checkOut(){
    var sale = {
      customerId: this.authService.getTokenData('id'),
      items: this.addedToCart,
      date: new Date,
      totalPrice: this.total,
    }

    if(confirm("Are you sure you want to checkout ")) {
    this.authService.addNewSale(sale).subscribe(data => {
      console.log(data);
      if((data as any).success){
        // this.refreshItemList();
        this.addedToCart.length = 0;
        this.total = 0;
        console.log('saved')
      }else{
        console.log('failed')
      }
    })//end of addNewSale
    this.addedToCart.forEach(e => {

      let newData = {
        itemName: e.itemName,
        itemDesc: e.itemDesc,
        itemQuan: e.itemQuan,
        itemPrice: e.itemPrice,
        status: true,
        date: e.date,
        createdBy: e.createdBy,
      }
      let id = e.itemId;

      this.authService.updateItem(id, newData).subscribe(e => {
        if((e as any).success){
          this.refreshItemList();
          // this.tasks.length = 0;
          console.log('updated')
        }else{
          console.log(e)
        }
      })

    });
  }//end of confirmation msg

  }

}
