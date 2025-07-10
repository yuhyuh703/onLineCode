import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CodeInput } from './code-input/code-input';



@Component({
  selector: 'app-root',
  imports: [CodeInput],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('onLineCodeFrontEnd');
  userInput: string = '';
  constructor(private http: HttpClient) {}


}


