import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { Message } from '../../interfaces/message'; // ✅ make sure this is imported

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.html',
  styleUrls: ['./message.scss'] // ✅ plural
})
export class MessageComponent implements OnInit { // ✅ renamed to avoid collision
  message: Message | null = null;
  icon: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.message$.subscribe(msg => {
      this.message = msg;

      // ✅ handle icon selection here (after message arrives)
      switch (msg?.severity) {
        case 'info':
          this.icon = 'bi bi-info-circle';
          break;
        case 'warning':
          this.icon = 'bi bi-radioactive';
          break;
        case 'danger':
          this.icon = 'bi bi-x-circle';
          break;
        case 'success':
          this.icon = 'bi bi-check-circle';
          break;
        default:
          this.icon = 'bi bi-patch-question';
          break;
      }
    });
  }
}
