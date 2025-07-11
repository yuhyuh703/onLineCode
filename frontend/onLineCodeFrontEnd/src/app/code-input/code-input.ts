import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

interface ResponseType{
  received: string,
  status: string

}

@Component({
  selector: 'app-code-input',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './code-input.html',
  styleUrl: './code-input.less'
})
export class CodeInput {
  userInput: string = ""
  feedback: string = ""
  programInput: string = "";
  languages = [
    { id: 45, name: 'Assembly (NASM 2.14.02)' },
    { id: 46, name: 'Bash (5.0.0)' },
    { id: 47, name: 'Basic (FBC 1.07.1)' },
    { id: 104, name: 'C (Clang 18.1.8)' },
    { id: 110, name: 'C (Clang 19.1.7)' },
    { id: 75, name: 'C (Clang 7.0.1)' },
    { id: 76, name: 'C++ (Clang 7.0.1)' },
    { id: 103, name: 'C (GCC 14.1.0)' },
    { id: 105, name: 'C++ (GCC 14.1.0)' },
    { id: 48, name: 'C (GCC 7.4.0)' },
    { id: 52, name: 'C++ (GCC 7.4.0)' },
    { id: 49, name: 'C (GCC 8.3.0)' },
    { id: 53, name: 'C++ (GCC 8.3.0)' },
    { id: 50, name: 'C (GCC 9.2.0)' },
    { id: 54, name: 'C++ (GCC 9.2.0)' },
    { id: 86, name: 'Clojure (1.10.1)' },
    { id: 51, name: 'C# (Mono 6.6.0.161)' },
    { id: 77, name: 'COBOL (GnuCOBOL 2.2)' },
    { id: 55, name: 'Common Lisp (SBCL 2.0.0)' },
    { id: 90, name: 'Dart (2.19.2)' },
    { id: 56, name: 'D (DMD 2.089.1)' },
    { id: 57, name: 'Elixir (1.9.4)' },
    { id: 58, name: 'Erlang (OTP 22.2)' },
    { id: 44, name: 'Executable' },
    { id: 87, name: 'F# (.NET Core SDK 3.1.202)' },
    { id: 59, name: 'Fortran (GFortran 9.2.0)' },
    { id: 60, name: 'Go (1.13.5)' },
    { id: 95, name: 'Go (1.18.5)' },
    { id: 106, name: 'Go (1.22.0)' },
    { id: 107, name: 'Go (1.23.5)' },
    { id: 88, name: 'Groovy (3.0.3)' },
    { id: 61, name: 'Haskell (GHC 8.8.1)' },
    { id: 96, name: 'JavaFX (JDK 17.0.6, OpenJFX 22.0.2)' },
    { id: 91, name: 'Java (JDK 17.0.6)' },
    { id: 62, name: 'Java (OpenJDK 13.0.1)' },
    { id: 63, name: 'JavaScript (Node.js 12.14.0)' },
    { id: 93, name: 'JavaScript (Node.js 18.15.0)' },
    { id: 97, name: 'JavaScript (Node.js 20.17.0)' },
    { id: 102, name: 'JavaScript (Node.js 22.08.0)' },
    { id: 78, name: 'Kotlin (1.3.70)' },
    { id: 111, name: 'Kotlin (2.1.10)' },
    { id: 64, name: 'Lua (5.3.5)' },
    { id: 89, name: 'Multi-file program' },
    { id: 79, name: 'Objective-C (Clang 7.0.1)' },
    { id: 65, name: 'OCaml (4.09.0)' },
    { id: 66, name: 'Octave (5.1.0)' },
    { id: 67, name: 'Pascal (FPC 3.0.4)' },
    { id: 85, name: 'Perl (5.28.1)' },
    { id: 68, name: 'PHP (7.4.1)' },
    { id: 98, name: 'PHP (8.3.11)' },
    { id: 43, name: 'Plain Text' },
    { id: 69, name: 'Prolog (GNU Prolog 1.4.5)' },
    { id: 70, name: 'Python (2.7.17)' },
    { id: 92, name: 'Python (3.11.2)' },
    { id: 100, name: 'Python (3.12.5)' },
    { id: 109, name: 'Python (3.13.2)' },
    { id: 71, name: 'Python (3.8.1)' },
    { id: 80, name: 'R (4.0.0)' },
    { id: 99, name: 'R (4.4.1)' },
    { id: 72, name: 'Ruby (2.7.0)' },
    { id: 73, name: 'Rust (1.40.0)' },
    { id: 108, name: 'Rust (1.85.0)' },
    { id: 81, name: 'Scala (2.13.2)' },
    { id: 82, name: 'SQL (SQLite 3.27.2)' },
    { id: 83, name: 'Swift (5.2.3)' },
    { id: 74, name: 'TypeScript (3.7.4)' },
    { id: 94, name: 'TypeScript (5.0.3)' },
    { id: 101, name: 'TypeScript (5.6.2)' },
    { id: 84, name: 'Visual Basic.Net (vbnc 0.0.0.5943)' }
  ];
  selectedLanguageId: number = 92; // default to Python 3.11.2

  constructor(private http: HttpClient) {


  }
  sendToBackend() {
    // Base64 encode source code and program input (stdin)
    const base64Source = btoa(this.userInput);
    const base64Stdin = this.programInput ? btoa(this.programInput) : "";
    const payload = {
      language_id: this.selectedLanguageId,
      source_code: base64Source,
      stdin: base64Stdin
    };
    this.feedback = 'Running...';
    this.http.post<any>('https://onlinecode.greenisland-0015b907.westeurope.azurecontainerapps.io/api/data', payload)
      .subscribe({
        next: (response) => {
          if (response && typeof response.stdout !== 'undefined') {
            this.feedback = response.stdout || '[No output]';
          } else if (response && response.status) {
            this.feedback = response.status;
          } else {
            this.feedback = '[No response from backend]';
          }
        },
        error: (error) => {
          this.feedback = 'Error: ' + (error?.error?.message || error.message || 'Unknown error');
          console.error('Error:', error);
        }
      });
  }

}
