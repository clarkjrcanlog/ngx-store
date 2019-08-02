import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { NotAuthGuard } from '../@core/services/guards/no.guard';

const routes: Routes = [{
  path: '',
  component: LoginComponent,
  canActivate: [NotAuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}
