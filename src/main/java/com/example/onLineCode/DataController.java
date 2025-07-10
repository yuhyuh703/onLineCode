// DataController.java
package com.example.onLineCode;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import com.example.onLineCode.Judge0Client;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class DataController {

    private final Judge0Client judge0Client;

    public DataController(Judge0Client judge0Client) {
        this.judge0Client = judge0Client;
    }

    @PostMapping("/data")
    public ResponseEntity<Map<String, String>> receiveData(@RequestBody Map<String, String> payload) {
        String input = payload.get("input");
        System.out.println("Received input: " + input);

        Map<String, String> response = Map.of(
                "status", "success",
                "received", input
        );
        String token = judge0Client.createSubmission(109, input, "lovro");
        try {Thread.sleep(5000);} catch (InterruptedException e) {}
        System.out.println("Token: " + token);
        Map< String, String > response1 = Map.of(
                "status", "success",
                "received", judge0Client.getSubmission(token));

        return ResponseEntity.ok(response1);
    }

}
