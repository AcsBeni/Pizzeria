import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { Apiservice } from '../../../services/api.service';



@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  constructor(    
    private api:Apiservice,
    private message: MessageService
  ){
  }
  login(){
    this.message.show("danger","Hiba","Nem adtál meg minden adatot")
  }
}
