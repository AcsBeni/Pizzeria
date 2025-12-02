export interface Order {
    id:number;
    user_id:number;
    total:number;
    shipping?:string;
    payment?:string;
    comment?:string;
    status:string;
    created_at?:Date;
    updated_at?:Date;
    
}