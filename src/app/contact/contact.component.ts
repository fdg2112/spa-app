import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ ReactiveFormsModule, HttpClientModule ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {
  emailData: FormGroup;
  constructor (){
    this.emailData = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      message: new FormControl('',Validators.required)
    });
  }

  async sendEmail(){
    emailjs.init('HmboO8THKvxk_LqNz');
    let response = await emailjs.send("service_udsly4d","template_k4jtmhr",{
      to_name: "Maxi",
      from_name: this.emailData.value.name,
      message: this.emailData.value.message,
      form_email: this.emailData.value.email,
      });

    alert ('Mensaje enviado!');
    this.emailData.reset();
  }
};
