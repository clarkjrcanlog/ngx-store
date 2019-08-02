import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  item: any;
  constructor(protected ref: NbDialogRef<AddToCartComponent>,
    public NbDialogService: NbDialogService) { }

  ngOnInit() {
    this.item = this.NbDialogService.varContainer;
    console.log(this.item);
  }

  cancel() {
    this.ref.close();
  }

  submit(cartQuantity) {
    var addToCart = {
      itemId: this.item._id,
      itemName: this.item.itemName,
      itemDesc: this.item.itemDesc,
      itemQuan: this.item.itemQuan - cartQuantity,
      itemPrice: this.item.itemPrice,
      status: this.item.status,
      date: this.item.date,
      createdBy: this.item.createdBy,
      cartQuantity: cartQuantity,
      subTotal: cartQuantity * this.item.itemPrice,
    }

    this.ref.close(addToCart);
  }

}
