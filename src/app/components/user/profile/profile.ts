import { Component } from '@angular/core';
import { Apiservice } from '../../../services/api.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  constructor(    private api:Apiservice
  ){
  }
  save(){}
}
