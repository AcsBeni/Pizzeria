import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private Isloggedin = new BehaviorSubject<boolean >(this.HasToken());
  Isloggedin$ = this.Isloggedin.asObservable();

  HasToken():boolean{
    return !!sessionStorage.getItem('pizzeria');
  }

  login(token:string){//TODO: Token majd string lesz, amint a JWt
    sessionStorage.setItem('pizzeria',token)
    this.Isloggedin.next(true)
   
  }
  logout(){
    sessionStorage.removeItem('pizzeria')
    this.Isloggedin.next(false)
  }
}
