import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
@Component({
    selector: 'app-signim',
    templateUrl: './signin.html'
})

export class SigninComponent {
    myForm: FormGroup;

    onSubmit(){
        console.log(this.myForm);
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