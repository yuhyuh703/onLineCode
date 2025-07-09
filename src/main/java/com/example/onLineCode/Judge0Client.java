package com.example.onLineCode;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

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

    public String createSubmission()  {
        return this.restClient.post()
                .uri("/submissions?base64_encoded=true&wait=false&fields=*")
                .body("""
                        {"language_id":52,"source_code":"I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=","stdin":"SnVkZ2Uw"}
                        """)
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
