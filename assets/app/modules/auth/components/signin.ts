import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../user";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
@Component({
    selector: 'app-signim',
    templateUrl: './signin.html'
})

export class SigninComponent {
    myForm: FormGroup;
    constructor(private authService: AuthService, private router: Router) {}
    onSubmit(){
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('token', data.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.myForm.reset();
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