import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs/Observable';
import { Message } from '../message';
import { AuthService } from '../auth.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Observable<any[]>;
  content: string;

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.messages = this.messageService.getAll2();
  }

  isMine(message: Message): boolean {
    if(!!this.authService.credential) {
      return message.from == this.authService.credential.user.uid;
    }
    return false;
  }

  delete(message: any) {
    this.messageService.delete(message.$key);
  }

  update(message: any) {
    message.content = message.content + '%';
    this.messageService.update(message.$key, message);
  }

  onKey(event: any) {
    if(this.content !== "") {
      let newMessage = <Message>{};
      
      newMessage.content = this.content;
      newMessage.date = new Date().toISOString();
      newMessage.name = this.authService.credential.user.displayName;
      newMessage.photo = this.authService.credential.user.photoURL;
      newMessage.from = this.authService.credential.user.uid;

      this.messageService.add(newMessage);
    }

      
      this.content = "";
  }

}
