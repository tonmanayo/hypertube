import { Routes } from "@angular/router"
import {SignupComponent} from "./components/signup";
import {SigninComponent} from "./components/signin";
import {LogoutComponent} from "./components/logout";

export const AUTH_ROUTES: Routes = [
    {path: '', redirectTo:'signup', pathMatch:'full'},
    {path: 'signup', component: SignupComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'logout', component: LogoutComponent}
];

