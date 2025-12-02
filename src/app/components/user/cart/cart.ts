import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../../../services/api.service';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../../interfaces/cartitem';
import { NumberformatPipe } from "../../../pipes/numberformat-pipe";
import { enviroment } from '../../../../enviroment/enviroment';
import { MessageService } from '../../../services/message.service';
import { CartService } from '../../../services/cart';
import { Order } from '../../../interfaces/order';
import { Orderitems } from '../../../interfaces/orderitems';



@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, NumberformatPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  

  items: CartItem[] = [];
  currency = enviroment.currency;
  allTotal =0
  newOrder:Order={
    id: 0,
    user_id: 0,
    total: 0,
    status: "pending",
    comment:"",
    shipping:"",
    payment:"",
    
    
    
  }
  constructor(
    private api: Apiservice,
    private auth: Auth,
    private message: MessageService,
    private cart: CartService
    
  ){
    

  }
  ngOnInit(): void {
    this.getData()
    
  }
  getData() {
    this.api.selectAll('carts_vt/userid/eq/'+ this.auth.loggedUser()[0].id).then(res =>{
      console.log(res)
      this.allTotal =0
      this.items = res.data as CartItem[]
      this.items.forEach(item => this.allTotal += item.total)
    })
  }
  remove(id: number) {
    if(confirm('Biztosan törlöd a kosárból?')){
      this.api.delete('carts', id).then(res =>{
        if(res.status ==500){
          this.message.show('danger', 'Hiba', res.message!);
          return
        }
        this.message.show('success', 'Success', 'A tétel törölve!');
        this.cart.refreshCartCount()
        this.getData();

      })
    }
  }
  update(item: CartItem) {
    let data={
      amount: item.amount
    }
    if(data.amount <=0){
      this.message.show('danger', 'Hiba', "Nem lehet 0 vagy kevesebb mennyiség");
        return
    }
    this.api.update('carts', item.id, data).then(res=>{
      if(res.status ==500){
        this.message.show('danger', 'Hiba', res.message!);
        return
      }
      this.message.show('success', 'Success', 'A tétel módosítva!');
        this.getData();
    })
  }
  emptyCart() {
    if(confirm("Biztosan kiürítéd a kosarat?")){
      this.api.delete('carts/userid/eq',this.auth.loggedUser()[0].id).then(res=>{
        if(res.status ==500){
          this.message.show('danger', 'Hiba', res.message!);
          return
        }
        this.message.show('success', 'Success', 'A tétel módosítva!');
        this.cart.clearCartCount()
          this.getData();
      })
    }
  }
  sendOrder() {
    this.newOrder.user_id = this.auth.loggedUser()[0].id
    this.newOrder.status = "completed";
    this.newOrder.total = this.allTotal;

    this.api.insert('orders',this.newOrder).then(res=>{
      const order_id = res.data.insersId

      let promises: Promise<any>[] =[]

      this.items.forEach(items =>{
        let orderItem: Orderitems={
          order_id: res.data.insersId,
          pizza_id: items.pizaaid,
          quantity: items.amount,
          price: items.price,
        }
        this.message.show('success', 'Success', 'A Rendelés sikeres!');

        let p = this.api.insert('order_items', orderItem).then(res =>{
          return this.api.delete('carts',items.id)
        })
        promises.push(p)
      })

      Promise.all(promises).then(()=>{
        this.message.show('success', 'Ok', 'A rendelés sikeresen leadva!')
        this.getData();
        this.cart.clearCartCount();
        this.newOrder={
          id: 0,
          user_id: 0,
          total: 0,
          status: "pending",
          comment:"",
          shipping:"",
          payment:"",
          
          
          
        }
      })
    })
  }
  
    
}
