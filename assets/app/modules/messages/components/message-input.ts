import {Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";

import {MessageService} from "../services/message-service";
import {Message} from "../message";
import {error} from "util";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.html',
})

export class MessageInputComponent implements OnInit{
    message: Message;
    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm) {
        //edit
        if (this.message) {
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result)
                );
            this.message = null;
        } else {
            const message = new Message(form.value.content, 'tony');
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.message = null;
        form.reset();
    }

    ngOnInit() {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message

        );
    }
}