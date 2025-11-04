import { Routes } from '@angular/router';
import { Pizzalist } from './components/system/pizzalist/pizzalist';
import { Login } from './components/user/login/login';
import { Registration } from './components/user/registration/registration';
import { Notfound } from './components/system/notfound/notfound';
import { Logout } from './components/user/logout/logout';

export const routes: Routes = [

    {path: 'pizzalist', component:Pizzalist},
    {path: 'login', component:Login},
    {path: 'registration', component:Registration},
    {path: 'logout', component:Logout},

    {path:"notfound", component:Notfound},
    {path:"", redirectTo:'notfound',pathMatch:'full'}


];
