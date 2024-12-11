import { Component } from '@angular/core';
import {ContactFormComponent} from "../contact/contact-form/contact-form.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {HeaderComponent} from "../../components/header/header.component";
import {TextContactComponent} from "../contact/text-contact/text-contact.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
    imports: [
        FooterComponent,
        HeaderComponent,
    ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
