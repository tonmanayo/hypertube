import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {User} from "../../auth/user";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.html'
})

export class SigninComponent {
    myForm: FormGroup;
    display = 'none';
    constructor(private authService: AuthService, private router: Router) {}
    onSubmit(){
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.myForm.reset();
    }

    onSignIn() {
        this.display = 'block';
    }

    onClose() {
        this.display = 'none';
    }

    ngOnInit(){
        var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

        this.myForm = new FormGroup({
            email: new FormControl(null,
                [Validators.required,
                    Validators.pattern(emailRegex)
                ]),
            password: new FormControl(null, Validators.required)
        });
    }
}