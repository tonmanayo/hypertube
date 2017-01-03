import {Component} from "@angular/core";
import { Router} from '@angular/router';
import {UserServices} from "../../services/user.services";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {JwtHelper, } from "angular2-jwt";

@Component({
    selector: 'my-42',
    template: `
              <html>
                <head>
                </head>
                <body>Redirecting...</body>
              </html>
            `
})
export class WtcApiComponent{
    constructor(private router: Router,
                private userservices: UserServices,
                private http: Http, private jwt: JwtHelper
    ){
        const status = this.router.url.slice(9, 13);
        if (status !== "code"){
            this.userservices.apiAuth = true;
            this.userservices.apiMsg = "42 login failed";
            this.router.navigate(['/auth', 'signin']);
            return ;
        }

        let token = this.router.url.split('=')[1];
        console.log("token: " + token);
        this.wtcSuccess(token)
            .subscribe(
                res => {
                    console.log(res);
                    this.router.navigate(['/auth', 'signin']);
                },
                error => {
                    this.userservices.apiAuth = true;
                    this.userservices.apiMsg = "42 denied access to your profile";
                    this.router.navigate(['/auth', 'signin']);
                    return ;
                }
            );
    }

    wtcSuccess(token: string){
        console.log("42 api call made");
        let header = new Headers();
        header.append('Authorization', 'Bearer ' + token);
        return this.http.get("https://api.intra.42.fr/v2/me?access_token="+token)
            .map(res => res.json())
            .catch(error => Observable.throw(error.json()));
    }
}