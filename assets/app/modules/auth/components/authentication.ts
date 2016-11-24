import {Component} from "@angular/core";
@Component({
    selector: 'app-authentication',
    template: `
            <header class="row spacing">
                 <nav class="col-md-8 col-md-offest-2">
                     <ul class="nav nav-tabs">
                         <li><a routerLinkActive="active" [routerLink]="['signup']" >Sign up</a></li>
                         <li><a routerLinkActive="active" [routerLink]="['signin']">Sign in</a></li>
                         <li><a routerLinkActive="active" [routerLink]="['logout']">Logout</a></li>
                     </ul>
                </nav>
            </header>
            <div class="row spacing">
             <router-outlet></router-outlet>
            </div>
`

})

export class AuthenticationComponent {

}