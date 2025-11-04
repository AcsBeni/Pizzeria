export interface User{
    id?:number,
    name:string,
    email:string,
    password:string,
    phone?:string,
    adress?:string,
    reg?:string,
    last?:string,
    status?:boolean
    confirm?:string
    role:"user"|"admin"
}