import { Component } from '@angular/core';
import { Apiservice } from '../../../services/api.service';


@Component({
  selector: 'app-passmod',
  imports: [],
  templateUrl: './passmod.html',
  styleUrl: './passmod.scss'
})
export class Passmod {
  constructor(    private api:Apiservice
    ){
    }
  save(){}
}
