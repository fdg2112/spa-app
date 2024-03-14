import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    desde: '',
    para: 'fdg2112@gmail.com', // Cambia esto por tu dirección de correo
    titulo: '',
    mensaje: ''
  };

  constructor(private http: HttpClient) { }

  enviarCorreo() {
    this.http.post<any>('http://localhost:3000/procesar-email', this.formData)
      .subscribe(response => {
        console.log('Correo enviado con éxito:', response);
        // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
      }, error => {
        console.error('Error al enviar correo:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      });
  }
}
