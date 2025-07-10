import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CodeInput } from './code-input/code-input';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CodeInput, HttpClient],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('onLineCodeFrontEnd');
  userInput: string = '';
  constructor(private http: HttpClient) {}

  sendToBackend() {
    const payload = { input: this.userInput };
    this.http.post('http://localhost:8080/api/data', payload)
      .subscribe({
        next: (response) => console.log('Response from backend:', response),
        error: (error) => console.error('Error:', error)
      });
  }
}


