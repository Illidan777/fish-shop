import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'import', loadChildren: () => import('./import/import.module').then(m => m.ImportModule) },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule) },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
