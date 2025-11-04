import { Component, Input, OnInit } from '@angular/core';
import { Navitem } from '../../interfaces/navitem';

import { RouterLink } from "@angular/router";
import { CommonModule, NgIf } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent implements OnInit {
  constructor(    
   
    private auth: Auth
  ){
  }
  @Input() title = '';
  isLoggedIn = false
  loggedUserName=''
  navItems: Navitem[] = [];

  ngOnInit(): void {
    this.auth.Isloggedin$.subscribe(res=>{
      this.isLoggedIn= res
      if(this.isLoggedIn){
        this.loggedUserName= this.auth.loggedUser()[0].name
      }
     
      this.setupMenu(res);
    })
    
  }

  setupMenu(Isloggedin:boolean) {
    this.navItems = [
      {
        name: 'Pizzalista',
        url: 'pizzalist',
        icon: '',
      },
      ...(Isloggedin)?[
        {
          name: 'Kilépés',
          url: 'logout',
          icon: '',
        },

      ]:[{
        name: 'Regisztráció',
        url: 'registration',
        icon: '',
      },
      {
        name: 'Belépés',
        url: 'login',
        icon: '',
      },]
      
    ];
  }
}