import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { Apiservice } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartCountSubject = new BehaviorSubject<number>(0)
  cartCount$ = this.cartCountSubject.asObservable();
  constructor(
    private auth: Auth,
    private api: Apiservice
  ){

  }
  refreshCartCount(){
    const uid = this.auth.loggedUser()[0].id;
    console.log(uid)
    if(!uid){
      this.clearCartCount();
      return
    }
    this.api.select('cartcounts_vt/userid/eq', uid).then(res=>{
      let total =0
      if(res.data.length>0){
        total = res.data[0].cartCount;
      }
      this.cartCountSubject.next(total)
    })
  }

  clearCartCount(){
    this.cartCountSubject.next(0);
  }
}
