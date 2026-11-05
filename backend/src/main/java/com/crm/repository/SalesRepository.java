package com.crm.repository;

import com.crm.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SalesRepository extends JpaRepository<Sales, Long> {

    List<Sales> findByStage(String stage);

    @Query("SELECT COALESCE(SUM(s.amount), 0) FROM Sales s WHERE s.stage = 'CLOSED_WON'")
    BigDecimal getTotalWonRevenue();

    @Query("SELECT COALESCE(SUM(s.amount), 0) FROM Sales s")
    BigDecimal getTotalPipelineValue();

    long countByStage(String stage);
}
