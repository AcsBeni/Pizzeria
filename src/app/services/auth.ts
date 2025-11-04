import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private tokenName= enviroment.tokenName
  private Isloggedin = new BehaviorSubject<boolean >(this.HasToken());
  Isloggedin$ = this.Isloggedin.asObservable();

  HasToken():boolean{
    return !!sessionStorage.getItem(this.tokenName);
  }

  login(token:string){//TODO: Token majd string lesz, amint a JWt
    sessionStorage.setItem(this.tokenName,token)
    this.Isloggedin.next(true)
   
  }
  logout(){
    sessionStorage.removeItem(this.tokenName)
    this.Isloggedin.next(false)
  }
  loggedUser(){
    const token = sessionStorage.getItem(this.tokenName)
    if(token){
      return JSON.parse(token)
    }
    return null
  }
  isAdmin():boolean{
    const user = this.loggedUser();
    return user.role ==='admin';
  }
  isLoggedUser():boolean{
    return this.Isloggedin.value
  }
}
