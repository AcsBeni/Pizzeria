import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../../../services/api.service';
import { Pizza } from '../../../interfaces/pizza';
import { enviroment } from '../../../../enviroment/enviroment';

@Component({
  selector: 'app-pizzas',
  imports: [CommonModule],
  templateUrl: './pizzas.html',
  styleUrl: './pizzas.scss',
})
export class Pizzas implements OnInit {

  currency = enviroment.currency
  pizzas:Pizza[]=[]
  
  constructor(
    private api: Apiservice
  ){}

  ngOnInit(): void{
    this.getPizzas();
  }
  getPizzas(){
    this.api.selectAll('pizzas').then(res=>{
      this.pizzas=res.data
    })
  }

}
