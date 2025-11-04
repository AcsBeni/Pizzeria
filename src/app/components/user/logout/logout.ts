import { Component } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.scss'
})
export class Logout {
  constructor( private auth: Auth,
    private router:Router,
    private message:MessageService
  ){}

  ngOnInit():void{
    this.auth.logout()
    this.message.show('success', 'Ok', 'Sikeresen kijelentkeztél!')
    this.router.navigate(['/login'])
  }
  
}
