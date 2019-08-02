import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule } from '@nebular/theme';

import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbLayoutModule } from '@nebular/theme';

import { TestPageComponent } from './pages/test-page/test-page.component';
import { SharedModule } from '../shared/shared.module';
import { StoreComponent } from './store/store.component';
import { AddToCartComponent } from './store/add-to-cart/add-to-cart.component';

@NgModule({
  imports: [
    UserRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbLayoutModule,
    NbCardModule,
    SharedModule.forRoot(),
  ],
  declarations: [
    UserComponent,
    TestPageComponent,
    StoreComponent,
    AddToCartComponent,
  ],
  entryComponents: [
    AddToCartComponent,
  ]
})
export class UserModule {}
