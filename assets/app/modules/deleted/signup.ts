import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "../auth/auth.service";
import { User} from "../auth/user";
@Component({
    selector: 'app-signup',
    templateUrl: './signup.html'
})

export class SignupComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AuthService) {}

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

    ngOnInit() {
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