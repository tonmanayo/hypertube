
import {Component, OnInit} from "@angular/core";
import {ErrorService} from "./error.service";
@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styles: [`
                .backdrop-color{
                background-color: rgba(0, 0, 0, 06);
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                }
                `]
})

export class ErrorComponent implements OnInit{
    error: Error;
    display: 'none';

    constructor (private errorService: ErrorService)
    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
        this.errorService.errorOccureed
            .subscribe(
                (error: Error) => {
                    this.error = error;
                    this.display = 'block';
                }
            )
    }


}