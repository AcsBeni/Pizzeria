import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { Apiservice } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  
    constructor(
      private api: Apiservice,
      private message: MessageService
    ) {}

    user: User={
      name: '',
      email: '',
      password: '',
      role: 'user'
    }
    users:User[]=[]

    //lapozhatás
    currentpage=1
    pageSize=5
    totalPages=1
    pagedUser:User[]=[]

    search=''

    ngOnInit(): void {
     
      this.getUsers();
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

    letiltas(id:number, status:number){
      this.api.update("/users",id,status).then(res =>{
        if(res.status===200){
          this.message.show('success', 'OK', 'Sikeres változtatás!');
        }
        else{
          this.message.show("danger",'Hiba','Hiba történt!');
        }
       
        return
      })
    }
    visszatiltas(id:number, status:number){
      this.api.select("users", id).then(res=>{
        
        this.api.update("users",id,res.data[0]).then(res =>{
          if(res.status===200){
            this.message.show('success', 'OK', 'Sikeres változtatás!');
          }
          else{
            this.message.show("danger",'Hiba','Hiba történt!');
          }
         
          return
        })
      })
      
      
    }
    
}
