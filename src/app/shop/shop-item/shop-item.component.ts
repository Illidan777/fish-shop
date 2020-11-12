import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BasketService} from '../../services/basket.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  item
  //   = {
  //   name: "Горбуша морожена",
  //   priceKg: 100,
  //   description: 'Приблизна вага одної шт 1 кг',
  //   enable: true,
  //   id: 333
  // };

  constructor(private http: HttpClient, public basket: BasketService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get item info
    const itemId = this.route.snapshot.queryParamMap.get('id');

    this.http.get(environment.hostUrl + `/shop/${itemId}`).subscribe((res: any) => {
      console.log(res)
      this.item = res.result;
    });
  }

  addToBasket() {
    const params = new HttpParams().set('id', this.item.id);
    this.http.post(`${environment.hostUrl}/shop/product/buy`, null, {params}).pipe(take(1)).subscribe((res: any) => {
      console.log('addToBasket res', res);
      this.basket.addItem(this.item.id);
    });
  }

  getImg(imgCode) {
    return environment.hostUrl + `/shop/image/${imgCode}`;
  }

}
