package com.crm.service;

import com.crm.dto.CustomerDTO;
import com.crm.dto.LeadDTO;
import com.crm.enums.LeadStatus;
import java.util.List;

public interface LeadService {
    LeadDTO createLead(LeadDTO leadDTO);
    List<LeadDTO> getAllLeads();
    LeadDTO getLeadById(Long id);
    LeadDTO updateLead(Long id, LeadDTO leadDTO);
    void deleteLead(Long id);
    List<LeadDTO> getLeadsByStatus(LeadStatus status);
    List<LeadDTO> searchLeads(String query);
    CustomerDTO convertLeadToCustomer(Long leadId);
}
