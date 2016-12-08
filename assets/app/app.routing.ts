import {Routes, RouterModule} from "@angular/router";
import {MessagesComponent} from "./modules/messages/components/messages";
import {AuthenticationComponent} from "./modules/auth/components/authentication";
import {AUTH_ROUTES} from "./modules/auth/auth.routes";
import {WelcomeComponent} from "./modules/welcome/welcome.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing =  RouterModule.forRoot(APP_ROUTES);