import { Component } from '@angular/core';
import * as io from 'socket.io-client';

const END_POINT = "https://3000-fc65a30f-b072-4206-ac71-830d93a0dbb2.ws-eu01.gitpod.io";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  socket;
  message: string;
  username: string;
  destinatario: string;

  constructor() { }

  ngOnInit() {
    this.socket = io.connect(END_POINT, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    });
    this.socket.on('message', (data: string) => {
      console.log(data);
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list').appendChild(element);
      }
    });
  }

  startChat() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket.emit('username', this.username);
    this.socket.emit('recipient', this.username + "#" + this.destinatario);
  }

  sendMessage() {
    this.socket.emit('message', { username: this.username, message: this.message });
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list').appendChild(element);
    this.message = '';
  }
}
