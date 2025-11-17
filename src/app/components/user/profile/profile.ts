import { Component } from '@angular/core';
import { Apiservice } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth';
import { MessageService } from '../../../services/message.service';

import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-profile',
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  constructor(    
      private api:Apiservice,
      private message:MessageService,
      private auth:Auth
      ){
    }
    User:User={
    
      name:"",
      email:"",
      password:"",
      role:"user"
   
    }
    emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    oldpassword="";
    newpassword="";
    confirmpassword="";
    
    ngOnInit(): void{
     
       
      this.User = this.auth.loggedUser()
      
    }
    Profileupdate(){
      if(this.User.email==""|| this.User.name==""){
        this.message.show('danger', 'Hiba',  `Kérem töltsön ki minden mezőt!!`)
        return;
      }
      if (!this.emailRegExp.test(this.User.email)) {
      this.message.show('danger', 'Hiba', "Érvénytelen email formátum!");
      return;
    }
      this.api.update("users", Number(this.User.id), this.User).then(res=>{
        if(res.status===400){
          this.message.show('danger', 'Hiba',  `${res.message}`)
          return
        }
        
        if(res.status===200){
          this.auth.login(JSON.stringify(res.data))
          console.log(JSON.stringify(res.data))
          this.message.show('success','Ok', `${res.message}`)
        }
      })
    } 
  Passwordupdate(){
    const passwords = {
    oldpass: this.oldpassword,
    password: this.newpassword
    };
    if(passwords.oldpass =="" || passwords.password=="" || this.confirmpassword==""){
      this.message.show('danger', 'Hiba',  `Kérem töltsön ki minden mezőt!!`)
      return;
    }
    /**  if (!this.passwdRegExp.test(this.User.password)) {
      this.message.show('danger', 'Hiba', "A jelszónak legalább 8 karakterből kell állnia, tartalmaznia kell kis- és nagybetűt, valamint számot!");
      return;
    }*/
    
    if(passwords.oldpass ==passwords.password){
      this.message.show('danger', 'Hiba',  `A régi meg az új jelszó nem lehet ugyanaz`)
      return;
    }
    if(passwords.password != this.confirmpassword){
      this.message.show('danger', 'Hiba',  `A megerősítő jelszónak és az új jelszónak ugyanannak kell lennie`)
      return;
    }
    this.api.update("users", Number(this.User.id), passwords ).then(res=>{
        if(res.status===400){
          this.message.show('danger', 'Hiba',  `${res.message}`)
          return
        }
        if(res.status===200){
          this.auth.login(JSON.stringify(res.data))
          console.log(JSON.stringify(res.data))
          this.message.show('success','Ok', `${res.message}`)
        }
      })
  }
    
}
