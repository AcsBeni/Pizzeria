import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apiservice } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { Auth } from '../../../services/auth';
import { Order } from '../../../interfaces/order';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  statusChange(orderId: number) {
    const order = this.Orders.find(o => o.id === orderId);
    if (order) {
      if (order.status === 'pending') {
        order.status = 'completed';
      } else if (order.status === 'completed') {
        order.status = 'cancelled';
      } else if (order.status === 'cancelled') {
        order.status = 'pending';
      }

      
      this.api.update('orders', orderId, { status: order.status }).then(() => {
      }).catch(err => {
        this.message.show('danger', 'Hiba', 'Nem sikerült frissíteni a rendelés státuszát.');
      });
    }
  }

  constructor(
    private api: Apiservice,
    private message: MessageService,
    private authService: Auth
  ) { }
  Orders:Order[]=[];
  Users:User[]=[];

  //lapozhatás
  currentpage=1
  pageSize=5
  totalPages=1
  pagedOrder:Order[]=[]
  formModal: any;

  ngOnInit(): void {
    this.getUsers();
    this.getOrders();
  }

  getUsers() {
    this.api.selectAll('users').then(res => {
      this.Users = res.data;
      
    }).catch(err => {
      console.error('Error fetching users:', err);
    });
  }

  getOrders() {
    this.api.selectAll('orders').then(res => {
      this.Orders = res.data;
      this.totalPages = Math.ceil(this.Orders.length / this.pageSize);
      this.pagedOrder = this.Orders.slice(0, this.pageSize);
  
    }).catch(err => {
      console.error('Error fetching orders:', err);
    });
  }
  

  setPage(page:number){
    this.currentpage =page;
    const startIndex= (page-1) * this.pageSize;
    const endIndex= startIndex + this.pageSize;
    this.pagedOrder = this.Orders.slice(startIndex, endIndex)
  }
  getUserName(searchedid:number){
    
    const searcheduser = this.Users.find(user => user.id === searchedid);
    
    return searcheduser ? searcheduser.name : 'Ismeretlen felhasználó';

  }


}
