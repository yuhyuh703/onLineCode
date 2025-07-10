import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-code-input',
  imports: [],
  templateUrl: './code-input.html',
  styleUrl: './code-input.less'
})
export class CodeInput {
  userInput: string = "asd"
  constructor(private http: HttpClient) {


  }
  sendToBackend() {
    const payload = { input: this.userInput };
    this.http.post('http://localhost:8080/api/data', payload)
      .subscribe({
        next: (response) => console.log('Response from backend:', response),
        error: (error) => console.error('Error:', error)
      });
  }
}
