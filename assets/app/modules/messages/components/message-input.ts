import {Component} from "@angular/core";
import { NgForm } from "@angular/forms";

import {MessageService} from "../services/message-service";
import {Message} from "../message";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.html',
})

export class MessageInputComponent {
    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm) {
        const message = new Message(form.value.content, 'tony');
        this.messageService.addMessage(message)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        form.resetForm();
    }
}