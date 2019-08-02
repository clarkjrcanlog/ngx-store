import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbLayoutModule, NbCardModule, NbStepperModule, NbButtonModule } from '@nebular/theme';

import { SharedModule } from '../shared/shared.module';
import { ItemComponent } from './item/item.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { EditItemComponent } from './item/edit-item/edit-item.component';
import { SalesComponent } from './sales/sales.component';
import { ViewSalesComponent } from './sales/view-sales/view-sales.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbLayoutModule,
    NbCardModule,
    NbStepperModule,
    NbButtonModule,
    SharedModule.forRoot(),
  ],
  declarations: [
    AdminComponent,
    ItemComponent,
    AddItemComponent,
    EditItemComponent,
    SalesComponent,
    ViewSalesComponent,
  ],
  entryComponents: [
    AddItemComponent, EditItemComponent, ViewSalesComponent,
  ],
})
export class AdminModule {}
