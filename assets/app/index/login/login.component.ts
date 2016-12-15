import {Component, Input, Output} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../auth/user";
import {AuthService} from "../../auth/auth.service";
import {IndexComponent} from "../index.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})

export class LoginComponent {
    private displayLsub;
    public displayL;

    myForm: FormGroup;
    constructor(private authService: AuthService, private router: Router, private indexComponent: IndexComponent) {}
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

    fCloseL(){
        this.indexComponent.displayL.next(false);
    }

    ngOnInit(){
        this.displayLsub = this.indexComponent.displayL$.subscribe(isDisplay => this.displayL = isDisplay);

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