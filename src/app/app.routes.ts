import { Routes } from '@angular/router';
import { Pizzalist } from './components/pizzalist/pizzalist';
import { Login } from './components/user/login/login';
import { Registration } from './components/user/registration/registration';
import { Notfound } from './components/system/notfound/notfound';
import { Logout } from './components/user/logout/logout';
import { Profile } from './components/user/profile/profile';
import { Cart } from './components/user/cart/cart';
import { Users } from './components/admin/users/users';
import { Orders } from './components/admin/orders/orders';
import { Pizzas } from './components/admin/pizzas/pizzas';
import { Stats } from './components/admin/stats/stats';
import { Myorders } from './components/user/myorders/myorders';


export const routes: Routes = [

    {path: 'pizzalist', component:Pizzalist},
    {path: 'login', component:Login},
    {path: 'registration', component:Registration},
    {path: 'logout', component:Logout},
    {path: 'profile', component:Profile},
    {path: 'cart', component:Cart},

    {path: 'users', component:Users},
    {path: 'orders', component:Orders},
    {path: 'pizzas', component:Pizzas},
    {path: 'stats', component:Stats},

    {path: 'myorders', component:Myorders},

  

    {path:"notfound", component:Notfound},
    {path:"", redirectTo:'notfound',pathMatch:'full'}

   

];
