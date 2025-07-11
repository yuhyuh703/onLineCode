# onLineCode
test
sequenceDiagram
    participant User as "User (Browser)"
    participant Frontend as "Frontend (Angular)"
    participant Backend as "Backend (Spring Boot)"
    participant Judge0 as "Judge0 API"

    User->>Frontend: Selects language, writes code, (optional) input
    User->>Frontend: Clicks "Run Code"
    Frontend->>Frontend: Base64-encode code & input
    Frontend->>Backend: POST /api/data {language_id, source_code, stdin}
    Backend->>Backend: Decode base64 code & input
    Backend->>Judge0: POST /submissions (base64)
    Judge0-->>Backend: Returns token
    Backend->>Judge0: GET /submissions/{token}
    Judge0-->>Backend: Returns result (stdout, stderr, status, all base64)
    Backend->>Backend: Decode stdout, stderr from base64
    Backend->>Frontend: Respond with {stdout, stderr, status}
    Frontend->>Frontend: Display output in UI
    User->>Frontend: Sees result