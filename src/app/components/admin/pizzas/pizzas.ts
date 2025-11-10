import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Apiservice } from '../../../services/api.service';
import { Pizza } from '../../../interfaces/pizza';
import { enviroment } from '../../../../enviroment/enviroment';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { NumberformatPipe } from "../../../pipes/numberformat-pipe";

declare var bootstrap: any;

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberformatPipe],
  templateUrl: './pizzas.html',
  styleUrls: ['./pizzas.scss'],
})
export class Pizzas implements OnInit, AfterViewInit {
  @ViewChild('formModal') formModalEl!: ElementRef;
  
  editMode=false
  confirmModal:any;
  formModal: any;
  currency = enviroment.currency;

  //lapozhatás
  currentpage=1
  pageSize=5
  totalPages=1
  pagedPizza:Pizza[]=[]

  pizzas: Pizza[] = [];
  pizza: Pizza = {
    id: 0,
    name: '',
    description: '',
    calory: 0,
    price: 0,
  };

  constructor(
    private api: Apiservice,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.formModal = new bootstrap.Modal("#exampleModal");
    this.confirmModal = new bootstrap.Modal("#confirmModal");
    this.getPizzas();
  }

  ngAfterViewInit(): void {
    
  }

  getPizzas() {
    this.api.selectAll('pizzas').then((res) => {
      this.pizzas = res.data;
      this.totalPages = Math.ceil(this.pizzas.length / this.pageSize);
      this.setPage(1)
    });
  }
  setPage(page:number){
    this.currentpage =page;
    const startIndex= (page-1) * this.pageSize;
    const endIndex= startIndex + this.pageSize;
    this.pagedPizza = this.pizzas.slice(startIndex, endIndex)
  }

  getPizza(id:number){
    this.api.select('pizzas',id).then(res =>{
      this.pizza = res.data[0];
      this.editMode=true
      this.formModal.show();
    })
  }



  save() {
    //pizza módosítása
    if(this.editMode){
      this.api.selectAll('pizzas/name/eq/' + this.pizza.name).then((res) => {
        if (res.data.length !== 0 && res.data[0].id != this.pizza.id) {
          this.message.show('danger', 'Hiba', 'Van már ilyen pizza!');
          return;
        }
        this.api.update("pizzas",this.pizza.id, this.pizza).then(res =>{
          this.message.show('success', 'OK', 'Sikeres változtatás!');
          this.formModal.hide()
          this.editMode=false
          this.pizza = {
            id: 0,
            name: '',
            description: '',
            calory: 0,
            price: 0,
          };
          this.getPizzas()
          return
        })
      
      });
    }
    //pizza felvétele
    else{
      if (!this.pizza.name || this.pizza.price === 0 || this.pizza.calory === 0) {
        this.message.show('danger', 'Hiba', 'Nem adtál meg minden adatot!');
        return;
      }
  
      this.api.selectAll('pizzas/name/eq/' + this.pizza.name).then((res) => {
        if (res.data.length !== 0) {
          this.message.show('danger', 'Hiba', 'Van már ilyen pizza!');
          return;
        }
  
        this.api.insert('pizzas', this.pizza).then(() => {
          this.message.show('success', 'Ok', 'A pizza hozzáadva!');
          this.getPizzas();
          this.formModal.hide();
  
          this.pizza = {
            id: 0,
            name: '',
            description: '',
            calory: 0,
            price: 0,
          };
  
          
        });
      });
    }
  }
  confirmDelete(id:number){
    this.pizza.id = id
    this.confirmModal.show();
  }
  delete(id:number){
    this.api.delete('pizzas',id).then(res=>{
      this.message.show("success","Ok","A pizza törölve lett!")
      this.confirmModal.hide();
      this.pizza = {
        id: 0,
        name: '',
        description: '',
        calory: 0,
        price: 0,
      };
      this.getPizzas();
    })
  }
}
