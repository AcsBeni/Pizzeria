import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  
  @Input() company ="";
  @Input() author = ''
  year = new Date().getFullYear();
}
