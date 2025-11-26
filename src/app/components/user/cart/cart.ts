import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../../../services/api.service';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../../interfaces/cartitem';
import { NumberformatPipe } from "../../../pipes/numberformat-pipe";
import { enviroment } from '../../../../enviroment/enviroment';


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
  constructor(
    private api: Apiservice,
    private auth: Auth
  ){
    

  }
  ngOnInit(): void {
    this.api.selectAll('carts_vt/userid/eq/'+ this.auth.loggedUser()[0].id).then(res =>{
      console.log(res)
      this.items = res.data as CartItem[]
      this.items.forEach(item => this.allTotal += item.total)
    })
  }
}
