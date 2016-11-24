import {Component, OnInit} from "@angular/core";
import {Message} from "../message";
import {MessageService} from "../services/message-service";

@Component({
    selector: 'app-message-list',
    template: `
    <div class="col-md-8">
        <app-message
          [message]="message"
          (editClicked)="message.content = $event"
          *ngFor="let message of messages">
        </app-message>
    </div>
`,
})


export class MessageListComponent implements OnInit {
    messages: Message[] = [
        new Message('2some message', 'tony')
    ];

    constructor (private messageService: MessageService){}

    ngOnInit(){
        this.messages = this.messageService.getMessage();
    }
}