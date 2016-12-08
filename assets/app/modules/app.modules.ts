import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpModule} from "@angular/http";

import { AppComponent } from "./app.component"
import { MessageComponent } from "./messages/components/message";
import { MessageListComponent } from "./messages/components/message-list";
import { MessageInputComponent } from "./messages/components/message-input";
import { MessagesComponent } from "./messages/components/messages";
import { AuthenticationComponent } from "./auth/components/authentication";
import { HeaderComponent } from "../header.component";
import { routing } from "../app.routing";
import { LogoutComponent } from "./auth/components/logout";
import { SignupComponent } from "./deleted/signup";
import { SigninComponent } from "./auth/components/signin";
import {AuthService} from "./auth/auth.service";
import {ErrorComponent} from "../errors/error.component";
import {ErrorService} from "../errors/error.service";
import {WelcomeService} from "./welcome/welcome.service";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ModalModule} from "ng2-bootstrap";

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        ErrorComponent,
        WelcomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        ModalModule,
    ],
    providers: [
        WelcomeService,
        AuthService,
        ErrorService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}