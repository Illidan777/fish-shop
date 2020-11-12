import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, take} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ChangeDetection} from '@angular/cli/lib/config/schema';
import {BasketService} from '../services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  orderInWork = false;

  user: {
    name: string,
    surname: string,
    company: string,
    country: string,
    city: string,
    region: string,
    phone: string,
    email: string
  } = {
    name: null,
    surname: null,
    company: null,
    country: null,
    city: null,
    region: null,
    phone: null,
    email: null
  };

  order;
  errorStatus: string;

  constructor(private http: HttpClient, private basket: BasketService) { }

  ngOnInit(): void {
    this.http.get(environment.hostUrl + '/shop/checkout').subscribe((res: any) => {
      console.log(res);
      this.order = res.result.cart;
      if (res.result.user) {
        this.user = res.result.user;
      }
    });
  }

  confirmOrder() {
    this.errorStatus = null;
    this.http.post(environment.hostUrl + '/shop/checkout/confirm', {...this.user}).pipe(catchError(this.handleError.bind(this)), take(1)).subscribe((res: any) => {
      console.log(res);
      if (res.code === 0) {
        this.orderInWork = true;
        this.basket.clear();
      }
    });
  }


  handleError(error: HttpErrorResponse){
    this.errorStatus = `${error.error.code}, ${error.error.message}`;
    return throwError(error);
  }
}
