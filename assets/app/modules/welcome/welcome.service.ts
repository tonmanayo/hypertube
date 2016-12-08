import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';

import {User} from "../auth/user";
import {ErrorService} from "../../errors/error-service";

@Injectable()
export class WelcomeService {
    constructor(private http: Http, private errorService: ErrorService) {
    }


    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:8080/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }



    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }




}