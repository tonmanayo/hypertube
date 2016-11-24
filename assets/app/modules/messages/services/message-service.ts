import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Message } from "../message";

@Injectable()
export class MessageService {
    private messages: Message[] = [];

    constructor(private http: Http){}

    addMessage(message: Message){
        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
       return this.http.post('http://localhost:8080/message', body, {headers: headers})
           .map((response: Response) =>  response.json())
           .catch((error: Response) => Observable.throw(error.json()));
    }

    getMessage(){
        return this.messages;
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}