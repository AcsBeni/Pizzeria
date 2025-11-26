import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apiservice } from '../../services/api.service';
import { Auth } from '../../services/auth';
import { Pizza } from '../../interfaces/pizza';
import { NumberformatPipe } from "../../pipes/numberformat-pipe";

import { enviroment } from '../../../enviroment/enviroment';
import { Lightbox } from '../system/lightbox/lightbox';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-pizzalist',
  imports: [CommonModule, FormsModule, NumberformatPipe, Lightbox],
  templateUrl: './pizzalist.html',
  styleUrl: './pizzalist.scss',
})
export class Pizzalist implements OnInit {





  constructor(
    private api: Apiservice,
    private auth: Auth,
   private message: MessageService
  ){

  }

  serverUrl = enviroment.serverUrl;
    lightboxVisible = false;
    lightboxImage = '';

  isLoggedIn = false
  pizzas:Pizza[]=[]
  filteredpizzas:Pizza[]=[]
  currency = 'Ft'
  searchTerm= '';

  AddtoCart(pizzaId: number) {
    const pizza = this.pizzas.find(pizza => pizza.id == pizzaId)
    const amount = pizza?.amount
    
    if(amount==0){
      this.message.show('danger', 'Hiba', "nem lehet 0 pizzát rendelni")
      return
    }
    let data={
      userid: this.auth.loggedUser()[0].id,
      pizzaId : pizzaId,
      amount: amount
    }

    pizza?.amount==0
     
    this.api.select('carts/userId/eq', data.userid).then(res=>
    {
      let idx =-1
      console.log(res.data)
      if(res.data.length >0){
        idx = res.data.findIndex((item: {pizzaid:number;}) => item.pizzaid = data.pizzaId)
      }
      if(idx > -1){
        data.amount = res.data[idx].amount + amount
        this.api.update('carts', res.data[idx].id, data).then(res=>{
          this.message.show("success", "OK", "A pizza darabszám módosítva a kosárban")
          return
        })
      }
      else{
        this.api.insert('carts', data).then(res=>{
          this.message.show("success", "OK", "A pizza hozzáadva a kosárba")
          return
        })
      }
      
    }
    )

  }
  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedUser()
    this.getPizzas()
  }

  getPizzas(){
    this.api.selectAll('pizzas').then(res =>{
      this.pizzas = res.data
      this.pizzas.forEach(pizza => pizza.amount =0 )
      this.filteredpizzas = res.data
      
    })
  }
  openLightbox(image: string){
    this.lightboxImage = this.serverUrl + '/uploads/' + image;
    this.lightboxVisible = true;
  }
  filterpizzas() {
    const term = this.searchTerm.toLowerCase().trim()
    this.filteredpizzas = this.pizzas.filter(p => p.name.toLowerCase().includes(term) || p.description?.toLowerCase().includes(term))
 }
 

}
