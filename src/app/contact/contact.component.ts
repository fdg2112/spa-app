import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ ReactiveFormsModule, HttpClientModule ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {
  emailData: FormGroup;
  constructor (private httpClient: HttpClient){
    this.emailData = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      message: new FormControl('',Validators.required)
    });
  }

  sendEmail(){
    let params = {
      name: this.emailData.value.name,
      email: this.emailData.value.email,
      message: this.emailData.value.message
    }
    this.httpClient.post('http://localhost:4200/',params).subscribe(resp=>{
      console.log(resp)
    })
  }
};
