import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "../../auth/auth.service";
import { User} from "../../auth/user";
import {IndexComponent} from "../index.component";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']

})

export class SignupComponent implements OnInit {

    private displaySsub;
    public displayS;
    myForm: FormGroup;
    constructor(private authService: AuthService, private indexComponent: IndexComponent) {}

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        this.myForm.reset();
    }

    fCloseS(){
        this.indexComponent.displayS.next(false);
    }

    ngOnInit() {

        this.displaySsub = this.indexComponent.displayS$.subscribe(isDisplay => this.displayS = isDisplay);

        var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null,
                [Validators.required,
                    Validators.pattern(emailRegex)
                ]),
            password: new FormControl(null, Validators.required)
        });
    }
}