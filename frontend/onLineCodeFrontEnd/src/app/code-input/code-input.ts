import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

interface ResponseType{
  received: string,
  status: string

}

@Component({
  selector: 'app-code-input',
  imports: [
    FormsModule
  ],
  templateUrl: './code-input.html',
  styleUrl: './code-input.less'
})
export class CodeInput {
  userInput: string = ""
  feedback: string = ""
  constructor(private http: HttpClient) {


  }
  sendToBackend() {
    const payload = { input: this.userInput };

    this.http.post<ResponseType>('http://localhost:8080/api/data', payload)
      .subscribe({
        next: (response) => {
          this.feedback = response.received;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }

}
