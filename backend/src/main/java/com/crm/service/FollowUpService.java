package com.crm.service;

import com.crm.entity.FollowUp;
import java.time.LocalDate;
import java.util.List;

public interface FollowUpService {
    FollowUp createFollowUp(FollowUp followUp);
    List<FollowUp> getAllFollowUps();
    FollowUp getFollowUpById(Long id);
    FollowUp updateFollowUp(Long id, FollowUp followUp);
    void deleteFollowUp(Long id);
    List<FollowUp> getFollowUpsByCustomer(Long customerId);
    List<FollowUp> getFollowUpsByDate(LocalDate date);
}
