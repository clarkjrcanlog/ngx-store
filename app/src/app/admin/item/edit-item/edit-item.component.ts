import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  item: any;
  constructor(protected ref: NbDialogRef<EditItemComponent>,
    public NbDialogService: NbDialogService) { }

  ngOnInit() {
    this.item = this.NbDialogService.varContainer;
    console.log(this.item);
  }

  cancel() {
    this.ref.close();
  }

  submit(itemName, itemDesc, itemQuan, itemPrice) {
    var items = {
      itemId: this.item._id,
      itemName: this.item.itemName,
      itemDesc: this.item.itemDesc,
      itemQuan: this.item.itemQuan,
      itemPrice: this.item.itemPrice,
      status: this.item.status,
      date: this.item.date,
      createdBy: this.item.createdBy,
    }
    this.ref.close(items);
  }
}
