package com.example.onLineCode;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Base64;

@Service
public class Judge0Client {
    private final RestClient restClient;

    public Judge0Client(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://judge0-ce.p.rapidapi.com")
                .defaultHeader("x-rapidapi-key", "d17330c6damsh518d79d417c23d7p1cc1c3jsn902f9c957c9a")
                .defaultHeader("x-rapidapi-host", "judge0-ce.p.rapidapi.com")
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String createSubmission(Integer lanID, String sourceCode, String stdIn)  {
        String encodedSourceCode = Base64.getEncoder().encodeToString(sourceCode.getBytes());
        String encodedStdIn = Base64.getEncoder().encodeToString(stdIn.getBytes());
        String body = String.format("""
                        {"language_id":%d,
                        "source_code":"%s",
                        "stdin":"%s"}
                        """, lanID, encodedSourceCode, encodedStdIn);
        return this.restClient.post()
                .uri("/submissions?base64_encoded=true&wait=false&fields=*")
                .body(body)
                .retrieve()
                .body(String.class);
    }

    public String getSubmission(String token) {
        String uri = String.format("/submissions/%s?base64_encoded=true&fields=*", token);
        return this.restClient.get()
                .uri(uri)
                .retrieve()
                .body(String.class);

    }
}
