import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { NavbarComponent } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { MessageComponent } from './components/message/message';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,NavbarComponent ,Footer, MessageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  subtitle= "ha megéhezel programozás közben"
  appTitle = "Türr Pizzeria"
  company = "Bajai SZC Türr István Technikum"
  author = "13.a Szoftverfejlesztő"

}
