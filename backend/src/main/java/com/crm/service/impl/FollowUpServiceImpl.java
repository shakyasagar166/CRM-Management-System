package com.crm.service.impl;

import com.crm.entity.FollowUp;
import com.crm.exception.ResourceNotFoundException;
import com.crm.repository.FollowUpRepository;
import com.crm.service.FollowUpService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FollowUpServiceImpl implements FollowUpService {

    private final FollowUpRepository followUpRepository;

    public FollowUpServiceImpl(FollowUpRepository followUpRepository) {
        this.followUpRepository = followUpRepository;
    }

    @Override
    public FollowUp createFollowUp(FollowUp followUp) {
        return followUpRepository.save(followUp);
    }

    @Override
    public List<FollowUp> getAllFollowUps() {
        return followUpRepository.findAll();
    }

    @Override
    public FollowUp getFollowUpById(Long id) {
        return followUpRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FollowUp", "id", id));
    }

    @Override
    public FollowUp updateFollowUp(Long id, FollowUp details) {
        FollowUp followUp = getFollowUpById(id);
        followUp.setTitle(details.getTitle());
        followUp.setFollowUpDate(details.getFollowUpDate());
        followUp.setType(details.getType());
        followUp.setNotes(details.getNotes());
        followUp.setStatus(details.getStatus());
        if (details.getCustomer() != null) {
            followUp.setCustomer(details.getCustomer());
        }
        return followUpRepository.save(followUp);
    }

    @Override
    public void deleteFollowUp(Long id) {
        FollowUp followUp = getFollowUpById(id);
        followUpRepository.delete(followUp);
    }

    @Override
    public List<FollowUp> getFollowUpsByCustomer(Long customerId) {
        return followUpRepository.findByCustomerId(customerId);
    }

    @Override
    public List<FollowUp> getFollowUpsByDate(LocalDate date) {
        return followUpRepository.findByFollowUpDate(date);
    }
}
