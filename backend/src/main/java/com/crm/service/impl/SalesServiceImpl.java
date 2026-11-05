package com.crm.service.impl;

import com.crm.entity.Sales;
import com.crm.exception.ResourceNotFoundException;
import com.crm.repository.SalesRepository;
import com.crm.service.SalesService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class SalesServiceImpl implements SalesService {

    private final SalesRepository salesRepository;

    public SalesServiceImpl(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    @Override
    public Sales createSale(Sales sale) {
        return salesRepository.save(sale);
    }

    @Override
    public List<Sales> getAllSales() {
        return salesRepository.findAll();
    }

    @Override
    public Sales getSaleById(Long id) {
        return salesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sales Deal", "id", id));
    }

    @Override
    public Sales updateSale(Long id, Sales saleDetails) {
        Sales sale = salesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sales Deal", "id", id));

        sale.setDealName(saleDetails.getDealName());
        sale.setAmount(saleDetails.getAmount());
        sale.setStage(saleDetails.getStage());
        sale.setExpectedCloseDate(saleDetails.getExpectedCloseDate());
        if (saleDetails.getCustomer() != null) {
            sale.setCustomer(saleDetails.getCustomer());
        }

        return salesRepository.save(sale);
    }

    @Override
    public void deleteSale(Long id) {
        Sales sale = salesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sales Deal", "id", id));
        salesRepository.delete(sale);
    }

    @Override
    public List<Sales> getSalesByStage(String stage) {
        return salesRepository.findByStage(stage);
    }

    @Override
    public BigDecimal getTotalWonRevenue() {
        return salesRepository.getTotalWonRevenue();
    }

    @Override
    public BigDecimal getTotalPipelineValue() {
        return salesRepository.getTotalPipelineValue();
    }
}
