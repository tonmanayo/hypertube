import {Component} from "@angular/core";
@Component({
    selector: 'app-header',
    template: `
        <header class="row">
                 <div routerLinkActive="active">
                     <a  [routerLink]="['/messages']">Messanger</a>
                 </div>
                 <div routerLinkActive="active">
                    <a [routerLink]="['/auth']">Authentication</a>
                 </div>
                 <div routerLinkActive="active">
                    <a [routerLink]="['/welcome']">Welcome</a>
                 </div>
        </header>
`
})
export class HeaderComponent {

}