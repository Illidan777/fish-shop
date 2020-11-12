import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BasketService} from '../services/basket.service';
import {environment} from '../../environments/environment';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  list: Array<any>;

  constructor(private http: HttpClient, private basket: BasketService) { }

  ngOnInit(): void {
    this.http.get(`${environment.hostUrl}/shop`).subscribe((res: any) => {
      console.log(res);
      this.list = res.result;
    });
  }

  getImg(imgCode){
    return environment.hostUrl + `/shop/image/${imgCode}`;
  }

  addToBasket(id){
    const params = new HttpParams().set('id', id);
    this.http.post(`${environment.hostUrl}/shop/product/buy`, null, {params}).pipe(take(1)).subscribe((res: any) => {
      console.log('addToBasket res', res);
      this.basket.addItem(id);
    })
  }
}
