// DataController.java
package com.example.onLineCode;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class DataController {

    @PostMapping("/data")
    public ResponseEntity<String> receiveData(@RequestBody Map<String, String> payload) {
        String input = payload.get("input");
        System.out.println("Received input: " + input);
        return ResponseEntity.ok("Received: " + input);
    }
}
