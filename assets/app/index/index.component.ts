import {Component} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})

export class IndexComponent {
    public displayL = new BehaviorSubject<boolean>(false);
    public displayL$ = this.displayL.asObservable();
    public displayS = new BehaviorSubject<boolean>(false);
    public displayS$ = this.displayS.asObservable();

    constructor(){}

    fShowL(){
        this.displayL.next(true);
    };

    fShowS(){
        this.displayS.next(true);
    }
}
