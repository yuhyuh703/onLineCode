package com.example.onLineCode;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TestController {

    private final Judge0Client judge0Client;

    public TestController(Judge0Client judge0Client) {
        this.judge0Client = judge0Client;
    }

    @GetMapping("/submission")
    public String testSubmission() {

        return judge0Client.createSubmission(52, """
                #include <stdio.h>
                
                int main(void) {
                  char name[10];
                  scanf("%s", name);
                  printf("hello, %s\\n", name);
                  return 0;
                }""", "matic");
    }

    @GetMapping("/token/{token}")
    public String testToken(@PathVariable String token) {
        return judge0Client.getSubmission(token);
    }
}
