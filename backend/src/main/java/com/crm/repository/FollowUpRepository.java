package com.crm.repository;

import com.crm.entity.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {

    List<FollowUp> findByCustomerId(Long customerId);

    List<FollowUp> findByStatus(String status);

    List<FollowUp> findByFollowUpDate(LocalDate date);
}
