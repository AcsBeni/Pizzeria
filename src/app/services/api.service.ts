import { Injectable } from '@angular/core';
import axios from 'axios';
import { ApiResponse } from '.././interfaces/APIresponse';
import { enviroment } from '../../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})

export class Apiservice {
  SERVER = enviroment.serverUrl;
  constructor() { }

  //GET all records from table -> GET http://localhost:3000/users
  async selectAll(table:string):Promise<ApiResponse>{
    try{
      const response = await axios.get(`${this.SERVER}/${table}`)
      return {
        status: 200,
        data: response.data
      };
     
    }
    catch(err:any){
      console.log(err)
      return{
        status: 500,
        message: "Hiba az adatbázis lekérdezése során"
      };
    }
  }
  //GET one record from table by id -> GET http://localhost:3000/users/5
  async select(table:string, id:number):Promise<ApiResponse>{
    try{
      const response = await axios.get(`${this.SERVER}/${table}/${id}`)
      return {
        status: 200,
        data: response.data
      };
     
    }
    catch(err:any){
      console.log(err)
      return{
        status: 500,
        message: "Hiba az adatbázis lekérdezése során"
      };
    }
  }

  async upload(formData: FormData): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${this.SERVER}/upload`, formData);
      return {
        status: 200,
        data: response.data,
      };
    } catch (err: any) {
      
      return {
        status: 500,
        message: "Nem sikerült a fájl feltöltése",
      };
    }
  }
  //regisztráció
  async registration(table:string, data:any){
    try{
      const response = await axios.post(`${this.SERVER}/${table}/registration`, data)
      return {
        status: 200,
        message: "regiszrtáció sikeres", 
        data: response.data
      };
     
    }
    catch(err:any){
      console.log(err)
      return{
        status: 500,
        message: err.response.data.error
      };
    }
  }
  //login
  async login(table:string, data:any){
    try{
      const response = await axios.post(`${this.SERVER}/${table}/login`, data)
      return {
        status: 200,
        message: "bejelentkezés sikeres", 
        data: response.data
      };
     
    }
    catch(err:any){
      console.log(err)
      return{
        status: 500,
        message: err.response.data.error
      };
    }
  }



  //INSERT one record into table -> POST http://localhost:3000/users
  async insert(table:string, data:any){
    try{
      const response = await axios.post(`${this.SERVER}/${table}`, data)
      return {
        status: 200,
        message: "Sikeres adatfelvétel a táblába", 
        data: response.data
      };
     
    }
    catch(err:any){
      console.log(err)
      return{
        status: 500,
        message: "Hiba a művelet során"
      };
    }
  }

  async deleteImage(filename: string): Promise<ApiResponse>{
    try{
      const response = await axios.delete(`${this.SERVER}/image/${filename}`)
      return{
        status: 200,
        data: response.data
      }
    }
    catch(err){
      return{
        status: 500,
        message: "Hiba a művelet során"
      };

    }
  }
//UPDATE one record in table by id -> PATCH http://localhost:3000/users/5 
  async update(table:string, id:number, data:any){
    try{
      const response = await axios.patch(`${this.SERVER}/${table}/${id}`, data)
      return {
        status: 200,
        message: "Sikeres adatfelvétel a táblába", 
        data: response.data
      };
     
    }
    catch(err:any){
      console.log(err)
      return{
        status: 500,
        message: "Hiba a művelet során"
      };
    }
  }
  //DELETE one record from table by id ->DELETE http://localhost:3000/users/5
  async delete(table:string, id:number):Promise<ApiResponse>{
    try{
      const response = await axios.delete(`${this.SERVER}/${table}/${id}`)
      return {
        status: 200,
        message: "Sikeres törlés a táblából 😊"
      };
     
    }
    catch(err:any){
      console.log(err)
      return{
        status: 500,
        message: "Hiba az adatbázis lekérdezése során"
      };
    }
  }

  //Delete all records from table -> DELETE http://localhost:3000/users
  async deleteAll(table:string){
    try{
      const response = await axios.delete(`${this.SERVER}/${table}`)
      return {
        status: 200,
        message: "Sikeres törlés minden rekord törölve 😒"
      };
     
    }
    catch(err:any){
      console.log(err)
      return{
        status: 500,
        message: "Hiba az adatbázis lekérdezése során"
      };
    }
  }
}
