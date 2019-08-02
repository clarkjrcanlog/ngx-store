import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(protected ref: NbDialogRef<AddItemComponent>,
    private authService: AuthService) { }

  ngOnInit() {
  }

  cancel() {
    this.ref.close();
  }

  submit(itemName, itemDesc, itemQuan, itemPrice) {

    var items = {
      itemName: itemName,
      itemDesc: itemDesc,
      itemQuan: itemQuan,
      itemPrice: itemPrice,
      status: true,
      date: new Date,
      createdBy: this.authService.getTokenData('id'),
    }
    this.ref.close(items);
  }

}
