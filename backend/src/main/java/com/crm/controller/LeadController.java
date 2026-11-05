package com.crm.controller;

import com.crm.dto.CustomerDTO;
import com.crm.dto.LeadDTO;
import com.crm.enums.LeadStatus;
import com.crm.service.LeadService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping
    public ResponseEntity<LeadDTO> createLead(@Valid @RequestBody LeadDTO leadDTO) {
        return new ResponseEntity<>(leadService.createLead(leadDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LeadDTO>> getAllLeads() {
        return ResponseEntity.ok(leadService.getAllLeads());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadDTO> getLeadById(@PathVariable Long id) {
        return ResponseEntity.ok(leadService.getLeadById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeadDTO> updateLead(@PathVariable Long id, @Valid @RequestBody LeadDTO leadDTO) {
        return ResponseEntity.ok(leadService.updateLead(id, leadDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Lead deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<LeadDTO>> getLeadsByStatus(@PathVariable LeadStatus status) {
        return ResponseEntity.ok(leadService.getLeadsByStatus(status));
    }

    @GetMapping("/search")
    public ResponseEntity<List<LeadDTO>> searchLeads(@RequestParam String query) {
        return ResponseEntity.ok(leadService.searchLeads(query));
    }

    @PostMapping("/{id}/convert")
    public ResponseEntity<CustomerDTO> convertLeadToCustomer(@PathVariable Long id) {
        return ResponseEntity.ok(leadService.convertLeadToCustomer(id));
    }
}
