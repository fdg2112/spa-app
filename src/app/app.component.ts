import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from './about/about.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, HomeComponent, FooterComponent, ContactComponent, AboutComponent]
})
export class AppComponent {
  title = 'spa-app';
}
