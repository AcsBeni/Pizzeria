import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { Apiservice } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { Order } from '../../../interfaces/order';

declare var bootstrap: any;


@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  
    constructor(
      private api: Apiservice,
      private message: MessageService,
      private authService: Auth
    ) {}

    loggeduser:User={
      name: '',
      email: '',
      password: '',
      role: 'user'
    }
    selecteduser:User ={
      name: '',
      email: '',
      password: '',
      role: 'user'
    }
    user: User={
      name: '',
      email: '',
      password: '',
      role: 'user'
    }
    orders:Order[]=[]
    users:User[]=[]
    activeTab: string = 'userinfo';

    //lapozhatás
    currentpage=1
    pageSize=5
    totalPages=1
    pagedUser:User[]=[]
    formModal: any;
    editMode=false

    search=''

    ngOnInit(): void {
      this.getLoggedUser();
      this.getUsers();
    }

    ngAfterViewInit(): void {
      this.formModal = new bootstrap.Modal(document.getElementById('formModal'));
    }

  getLoggedUser() {
    this.loggeduser = this.authService.loggedUser()[0];
    
  }
  getUsers() {
    this.api.selectAll('users').then((res) => {
      this.users = res.data;
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      this.setPage(1)
    });
  }


    setPage(page:number){
      this.currentpage =page;
      const startIndex= (page-1) * this.pageSize;
      const endIndex= startIndex + this.pageSize;
      this.pagedUser = this.users.slice(startIndex, endIndex)
    }

    statusChange(id:number){
     
      if(id == this.loggeduser.id){
        this.message.show('warning','Hiba', `Saját magad státuszát nem változtathatod meg!`)
        return;
      }
      
      let idx = this.users.findIndex(u => u.id === id);
      this.users[idx].status = !this.users[idx].status;

      this.api.update('users', id, {status: this.users[idx].status ? 1: 0}).then(res => {
        this.message.show('success','Ok', `${res.message}`)
      })
      
      
    }

    //modal form kezelése
    cancel(){
      this.formModal.hide();
      this.selecteduser = {
        name: '',
        email: '',
        password: '',
        role: 'user'
      };
      this.orders = [];
      
    }
    save(){

    }
    showDetails(id: number) {
      const idx = this.users.findIndex(u => u.id === id);
      if (idx !== -1) {
        this.selecteduser = this.users[idx];
       
      } else {
        this.message.show('warning', 'Hiba', 'A felhasználó nem található!');
      }
      this.api.select('orders/user_id/eq/', id).then(res => {
       this.orders = res.data;
       this.formModal.show();
      });
     
    }
}
