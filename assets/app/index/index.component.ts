import {Component, } from "@angular/core";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})

export class IndexComponent {
    displayL = false;
    displayS = false;

    constructor(){
        this.displayL = false;
        this.displayS = false;
    }

    fShowL(){
        this.displayL = true;
    };
    fShowS(){
        this.displayS = true;
    }
    fClose(){
        this.displayL = false;
    }
}
