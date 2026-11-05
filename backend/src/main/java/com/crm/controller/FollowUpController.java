package com.crm.controller;

import com.crm.entity.FollowUp;
import com.crm.service.FollowUpService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/followups")
public class FollowUpController {

    private final FollowUpService followUpService;

    public FollowUpController(FollowUpService followUpService) {
        this.followUpService = followUpService;
    }

    @PostMapping
    public ResponseEntity<FollowUp> createFollowUp(@RequestBody FollowUp followUp) {
        return new ResponseEntity<>(followUpService.createFollowUp(followUp), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FollowUp>> getAllFollowUps() {
        return ResponseEntity.ok(followUpService.getAllFollowUps());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FollowUp> getFollowUpById(@PathVariable Long id) {
        return ResponseEntity.ok(followUpService.getFollowUpById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FollowUp> updateFollowUp(@PathVariable Long id, @RequestBody FollowUp followUp) {
        return ResponseEntity.ok(followUpService.updateFollowUp(id, followUp));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteFollowUp(@PathVariable Long id) {
        followUpService.deleteFollowUp(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Follow-up deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<FollowUp>> getFollowUpsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(followUpService.getFollowUpsByCustomer(customerId));
    }
}
