import { Component } from '@angular/core';
import { Apiservice } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  constructor(    private api:Apiservice,
    private auth:Auth
  ){
  }

  User:User={
    id:0,
    name:"",
    password:"",
    email:"",
    role:"user"

  }
  ngOnInit(): void{
     
       
    this.User = this.auth.loggedUser()
    
  }


  save(){}
}
