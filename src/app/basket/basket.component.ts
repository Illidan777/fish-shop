import { Component, OnInit } from '@angular/core';
import {BasketService} from '../services/basket.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketList: Array<any> = [];
  totalPrice = 0;

  constructor(public basket: BasketService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(`${environment.hostUrl}/shop/cart`).subscribe((res: any) => {
      console.log(res)
      this.basketList = res.result.cartItems;
      this.totalPrice = res.result.sum;
    })
  }

  getImg(imgCode){
    return environment.hostUrl + `/shop/image/${imgCode}`;
  }

  updateQuantity(item: any) {
    const params = new HttpParams().set('quantity', item.quantity.toString()).set('id', item.productDTO.id.toString());
    this.http.put(`${environment.hostUrl}/shop/cart`, null, {params}).pipe(take(1)).subscribe((res: any) => {
      console.log(res)
      if (res.code === 0) {
        item.dirty = false;
      }
    });
  }

  removeItem(id: number) {
    const params = new HttpParams().set('id', id.toString());
    this.http.delete(`${environment.hostUrl}/shop/cart`, {params}).pipe(take(1)).subscribe((res: any) => {
      console.log(res)
      if (res.code === 0) {
        this.basketList = this.basketList.filter(el => el.productDTO.id !== id)
        this.basket.removeItem(id);
      }
    });
  }

  removeAll() {
    this.http.delete(`${environment.hostUrl}/shop/cart/all`).pipe(take(1)).subscribe((res: any) => {
      console.log(res);
      if (res.code === 0) {
        this.basketList = [];
        this.basket.clear();
      }
    });
  }




}
