import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../admin-menu';
import { NbDialogService } from '@nebular/theme';
import { AuthService } from '../../@core/services/auth.service';

import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { timeoutWith } from 'rxjs/operators';
@Component({
  selector: 'ngx-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  menu = MENU_ITEMS;
  itemsCollect: any = [];
  itemChecker: any = [];

  constructor(private dialogService: NbDialogService,
    private authService: AuthService) { }

  ngOnInit() {this.refreshItemList()
  }

  refreshItemList() {
    this.authService.getItemList().subscribe((res) => {
      this.itemsCollect = res;
      // this.taskFromDb = res;
      // this.all = this.taskFromDb.concat(this.tasks);
      // // this.all = this.all.forEach(e => e.selected = false)
      // this.all = this.all.filter(e => {
      //   e.selected = false;
      //   e.selectedStat = false;
      //   return e.isDeleted === false;

      // });
      this.itemsCollect = this.itemsCollect.filter(e => {
        e.selected = false;
        return e.status === true;
      })

    });
  }

  addItemModal(){
    this.dialogService.open(AddItemComponent)
      .onClose.subscribe(items => {
        items && this.authService.addNewItem(items).subscribe(data => {
          console.log(data);
          if((data as any).success){
            this.refreshItemList();
            // this.tasks.length = 0;
            console.log('saved')
          }else{
            console.log('failed')
          }
        })
      });

  }

  editItemModal(item){
    this.dialogService.open(EditItemComponent)
      .onClose.subscribe(items => {
        items && this.editHandler(items);
      });
      this.dialogService.varContainer = item;
  }

  editHandler(items){
    let data = {
      itemName: items.itemName,
      itemDesc: items.itemDesc,
      itemQuan: items.itemQuan,
      itemPrice: items.itemPrice,
      status: items.status,
      date: items.date,
      createdBy: items.createdBy,
    }

    let id = items.itemId;

    this.authService.updateItem(id, data).subscribe(e => {
      if((e as any).success){
        this.refreshItemList();
        // this.tasks.length = 0;
        console.log(e)
      }else{
        console.log(e)
      }
    })

  }

  deleteItem(item){

    if(confirm("Are you sure to delete "+ item.itemName)) {
        console.log('fromBb')
        let data = {
          itemName: item.itemName,
          itemDesc: item.itemDesc,
          itemQuan: item.itemQuan,
          itemPrice: item.itemPrice,
          status: false,
          date: item.date,
          createdBy: item.createdBy,
        }

        let id = item._id;

        this.authService.updateItem(id, data).subscribe(e => {
          if((e as any).success){
            this.refreshItemList();
            // this.tasks.length = 0;
            console.log(e)
          }else{
            console.log(e)
          }
        })


    }//end of confirmation msg

  }


  itemCheck(item){

    item.selected = !item.selected;

    if(item.selected == true){

      this.itemChecker.push({
        itemId: item._id,
        itemName: item.itemName,
        itemDesc: item.itemDesc,
        itemQuan: item.itemQuan,
        itemPrice: item.itemPrice,
        status: item.status,
        date: item.date,
        createdBy: item.createdBy,
      });
    }else{
      this.itemChecker.pop(item);
    }

    console.log(this.itemChecker);
  }

  deleteMulti(){
    if(confirm("Are you sure to delete ")){
      this.itemChecker.forEach(e => {
        console.log('fromBb')
        let data = {
          itemName: e.itemName,
          itemDesc: e.itemDesc,
          itemQuan: e.itemQuan,
          itemPrice: e.itemPrice,
          status: false,
          date: e.date,
          createdBy: e.createdBy,
        }

        let id = e.itemId;

        this.authService.updateItem(id, data).subscribe(e => {
          if((e as any).success){
            this.refreshItemList();
             this.itemChecker.length = 0;
            console.log(e)
          }else{
            console.log(e)
          }
        })

      })
    }
  }

}
