import { Component, Input, OnInit } from '@angular/core';
import { Navitem } from '../../interfaces/navitem';

import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent implements OnInit {
  @Input() title = '';

  navItems: Navitem[] = [];

  ngOnInit(): void {
    this.setupMenu();
  }

  setupMenu() {
    this.navItems = [
      {
        name: 'Pizzalista',
        url: 'pizzalist',
        icon: '',
      },
      {
        name: 'Regisztráció',
        url: 'registration',
        icon: '',
      },
      {
        name: 'Belépés',
        url: 'login',
        icon: '',
      },
    ];
  }
}