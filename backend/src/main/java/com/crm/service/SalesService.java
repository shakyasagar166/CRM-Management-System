package com.crm.service;

import com.crm.entity.Sales;
import java.math.BigDecimal;
import java.util.List;

public interface SalesService {
    Sales createSale(Sales sale);
    List<Sales> getAllSales();
    Sales getSaleById(Long id);
    Sales updateSale(Long id, Sales sale);
    void deleteSale(Long id);
    List<Sales> getSalesByStage(String stage);
    BigDecimal getTotalWonRevenue();
    BigDecimal getTotalPipelineValue();
}
