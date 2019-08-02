import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbLayoutModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ThemeModule.forRoot(),
    NbLayoutModule,
    FormsModule,
  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule {}
