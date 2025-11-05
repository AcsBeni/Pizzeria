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
  isAdmin=false
  loggedUserName=''
  navItems: Navitem[] = [];

  ngOnInit(): void {
    this.auth.Isloggedin$.subscribe(res=>{
      this.isLoggedIn= res
      this.isAdmin = this.auth.isAdmin()
      
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
       
        ...(this.isAdmin)? [
          {
            name:"Pizzák kezelése",
            url:"pizzas",
            icon:"bi-data"
          },
          {
            name: 'Felhasználók kezelése',
            url: 'users',
            icon: 'bi-people',
          },
          {
            name: 'Rendelések kezelése',
            url: 'orders',
            icon: 'bi-receipt',
          },
          {
            name: 'Statisztika',
            url: 'stats',
            icon: 'bi-graph-up-arrow',
          },

        ]: [
          {
            name: 'Rendeléseim',
            url: 'myorders',
            icon: 'bi-receipt',
          },
        ],
         
        {
          name:"Kosár",
          url:"cart",
          icon:"bi-cart",
          badge:3
        },
        {
          name: 'Profilom',
          url: 'profile',
          icon: 'bi-person',
        },
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