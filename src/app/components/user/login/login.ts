import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";

import { CommonModule, JsonPipe } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { Apiservice } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { Auth } from '../../../services/auth';



@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  constructor(    
    private api:Apiservice,
    private message: MessageService,
    private router: Router,
    private auth: Auth
  ){
  }
   User:User={
    
      name: 'a',
      email: '',
      password: '',
      role: 'user',
      
    }
  rememberMe:boolean=false
  login(){
    if(!this.User.email || !this.User.password){
      this.message.show('danger', 'Hiba', "Nem adtál meg minden adatot!")
      return
    }
    
    this.api.login('users', this.User).then(res=>{
      if(res.status===500){
        this.message.show('danger', 'Hiba', res.message)
        return
      }
      if(this.rememberMe){
        this.auth.storeUser(JSON.stringify(res.data))
      }
      if(res.status===200){
        this.auth.login(JSON.stringify(res.data))
        this.message.show('success','Ok', res.message)
        this.router.navigate(['/pizzalist']);
      }
      //maradjon bejelentkezve
      
     
      
    })
    
  }
  
}
