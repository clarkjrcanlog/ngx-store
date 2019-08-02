import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './@core/services/guards/auth.guard';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('app/user/user.module')
      .then(m => m.UserModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('app/admin/admin.module')
      .then(m => m.AdminModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('app/login/login.module')
      .then(m => m.LoginModule),
  },
  { path: '',         redirectTo: 'login', pathMatch: 'full' },
  { path: '**',       redirectTo: 'login' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
