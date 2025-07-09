package com.example.onLineCode;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final Judge0Client judge0Client;

    public TestController(Judge0Client judge0Client) {
        this.judge0Client = judge0Client;
    }

    @GetMapping("/test-submission")
    public String testSubmission() {

        return judge0Client.createSubmission();
    }

    @GetMapping("/token/{token}")
    public String testToken(@PathVariable String token) {
        return judge0Client.getSubmission(token);
    }
}
