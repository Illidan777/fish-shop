import { Component } from '@angular/core';
import {BasketService} from './services/basket.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private basketService: BasketService, private httpClient: HttpClient) {
    this.httpClient.get(environment.hostUrl + '/shop/cart').pipe(take(1)).subscribe((res: any) => {
      console.log(res)
      res.result.cartItems.forEach(item => this.basketService.addItem(item.productDTO.id));
    });
  }
}
