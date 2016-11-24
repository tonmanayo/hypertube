import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
@Component({
    selector: 'app-signup',
    templateUrl: './signup.html'
})

export class SignupComponent implements OnInit{
    myForm: FormGroup;

    onSubmit(){
        console.log(this.myForm);
        this.myForm.reset();
    }

    ngOnInit(){
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