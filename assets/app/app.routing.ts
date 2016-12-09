import {Routes, RouterModule} from "@angular/router";
import {MessagesComponent} from "./messages/components/messages";
import {AuthenticationComponent} from "./auth/components/authentication";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {IndexComponent} from "./index/index.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing =  RouterModule.forRoot(APP_ROUTES);