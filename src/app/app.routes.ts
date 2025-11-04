import { Routes } from '@angular/router';
import { Pizzalist } from './components/system/pizzalist/pizzalist';
import { Login } from './components/user/login/login';
import { Registration } from './components/user/registration/registration';
import { Notfound } from './components/system/notfound/notfound';

export const routes: Routes = [

    {path: 'pizzalist', component:Pizzalist},
    {path: 'login', component:Login},
    {path: 'registration', component:Registration},

    {path:"*", component:Notfound},
    {path:"", redirectTo:'pizzalista',pathMatch:'full'}


];
