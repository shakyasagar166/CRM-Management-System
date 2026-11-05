package com.crm.controller;

import com.crm.entity.Sales;
import com.crm.service.SalesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sales")
public class SalesController {

    private final SalesService salesService;

    public SalesController(SalesService salesService) {
        this.salesService = salesService;
    }

    @PostMapping
    public ResponseEntity<Sales> createSale(@RequestBody Sales sale) {
        return new ResponseEntity<>(salesService.createSale(sale), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Sales>> getAllSales() {
        return ResponseEntity.ok(salesService.getAllSales());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sales> getSaleById(@PathVariable Long id) {
        return ResponseEntity.ok(salesService.getSaleById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sales> updateSale(@PathVariable Long id, @RequestBody Sales sale) {
        return ResponseEntity.ok(salesService.updateSale(id, sale));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteSale(@PathVariable Long id) {
        salesService.deleteSale(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Sale deal deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stage/{stage}")
    public ResponseEntity<List<Sales>> getSalesByStage(@PathVariable String stage) {
        return ResponseEntity.ok(salesService.getSalesByStage(stage));
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, BigDecimal>> getSalesMetrics() {
        Map<String, BigDecimal> metrics = new HashMap<>();
        metrics.put("totalWonRevenue", salesService.getTotalWonRevenue());
        metrics.put("totalPipelineValue", salesService.getTotalPipelineValue());
        return ResponseEntity.ok(metrics);
    }
}
