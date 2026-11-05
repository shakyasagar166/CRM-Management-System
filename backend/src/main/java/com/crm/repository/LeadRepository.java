package com.crm.repository;

import com.crm.entity.Lead;
import com.crm.enums.LeadStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    List<Lead> findByStatus(LeadStatus status);

    long countByStatus(LeadStatus status);

    @Query("SELECT l FROM Lead l WHERE " +
           "LOWER(l.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(l.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(l.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(l.company) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(l.source) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Lead> searchLeads(@Param("query") String query);
}
