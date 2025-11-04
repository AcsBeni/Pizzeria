import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Apiservice } from '../../../services/api.service';
import { User } from '../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registration',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration {
  
  acceptTerms: boolean=false
  newUser:User={
  
    name: '',
    email: '',
    password: '',
    role: 'user',
    confirm:""
  }
  constructor(    private api:Apiservice,
    private message:MessageService,
    private router: Router
    ){
    }
  
  registration(){
    if(!this.newUser.name || !this.newUser.email|| !this.newUser.password|| !this.newUser.confirm){
      this.message.show('danger', 'Hiba', "Nem adtál meg minden adatot!")
      return
    }
    if(!this.acceptTerms ){
      this.message.show('danger', 'Hiba', "El kell fogadnod a szabályzatot!")
      return
    }
    this.api.registration('users',this.newUser).then(res=>{
      if(res.status===500){
        this.message.show('danger', 'Hiba', res.message)
        return
      }
      this.message.show('success','Ok', res.message)
      this.newUser={
      
        name: '',
        email: '',
        password: '',
        role: 'user',
        confirm:"",
        adress:"",
        phone:""
      }
      this.router.navigate(['/pizzalist']);
      
    })
  }
} 
