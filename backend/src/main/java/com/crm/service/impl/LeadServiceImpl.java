package com.crm.service.impl;

import com.crm.dto.CustomerDTO;
import com.crm.dto.LeadDTO;
import com.crm.entity.Customer;
import com.crm.entity.Lead;
import com.crm.enums.LeadStatus;
import com.crm.exception.ResourceNotFoundException;
import com.crm.repository.CustomerRepository;
import com.crm.repository.LeadRepository;
import com.crm.service.LeadService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;
    private final CustomerRepository customerRepository;

    public LeadServiceImpl(LeadRepository leadRepository, CustomerRepository customerRepository) {
        this.leadRepository = leadRepository;
        this.customerRepository = customerRepository;
    }

    private LeadDTO mapToDTO(Lead lead) {
        LeadDTO dto = new LeadDTO();
        dto.setId(lead.getId());
        dto.setFirstName(lead.getFirstName());
        dto.setLastName(lead.getLastName());
        dto.setEmail(lead.getEmail());
        dto.setPhone(lead.getPhone());
        dto.setCompany(lead.getCompany());
        dto.setSource(lead.getSource());
        dto.setStatus(lead.getStatus());
        dto.setEstimatedValue(lead.getEstimatedValue());
        dto.setNotes(lead.getNotes());
        dto.setCreatedAt(lead.getCreatedAt());
        dto.setUpdatedAt(lead.getUpdatedAt());
        return dto;
    }

    private Lead mapToEntity(LeadDTO dto) {
        Lead lead = new Lead();
        lead.setFirstName(dto.getFirstName());
        lead.setLastName(dto.getLastName());
        lead.setEmail(dto.getEmail());
        lead.setPhone(dto.getPhone());
        lead.setCompany(dto.getCompany());
        lead.setSource(dto.getSource());
        lead.setStatus(dto.getStatus() != null ? dto.getStatus() : LeadStatus.NEW);
        lead.setEstimatedValue(dto.getEstimatedValue());
        lead.setNotes(dto.getNotes());
        return lead;
    }

    @Override
    public LeadDTO createLead(LeadDTO leadDTO) {
        Lead lead = mapToEntity(leadDTO);
        Lead savedLead = leadRepository.save(lead);
        return mapToDTO(savedLead);
    }

    @Override
    public List<LeadDTO> getAllLeads() {
        return leadRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LeadDTO getLeadById(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead", "id", id));
        return mapToDTO(lead);
    }

    @Override
    public LeadDTO updateLead(Long id, LeadDTO leadDTO) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead", "id", id));

        lead.setFirstName(leadDTO.getFirstName());
        lead.setLastName(leadDTO.getLastName());
        lead.setEmail(leadDTO.getEmail());
        lead.setPhone(leadDTO.getPhone());
        lead.setCompany(leadDTO.getCompany());
        lead.setSource(leadDTO.getSource());
        if (leadDTO.getStatus() != null) {
            lead.setStatus(leadDTO.getStatus());
        }
        lead.setEstimatedValue(leadDTO.getEstimatedValue());
        lead.setNotes(leadDTO.getNotes());

        Lead updated = leadRepository.save(lead);
        return mapToDTO(updated);
    }

    @Override
    public void deleteLead(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead", "id", id));
        leadRepository.delete(lead);
    }

    @Override
    public List<LeadDTO> getLeadsByStatus(LeadStatus status) {
        return leadRepository.findByStatus(status).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<LeadDTO> searchLeads(String query) {
        return leadRepository.searchLeads(query).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustomerDTO convertLeadToCustomer(Long leadId) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("Lead", "id", leadId));

        Customer customer = new Customer();
        customer.setFirstName(lead.getFirstName());
        customer.setLastName(lead.getLastName());
        customer.setEmail(lead.getEmail());
        customer.setPhone(lead.getPhone());
        customer.setCompany(lead.getCompany());
        customer.setStatus("ACTIVE");

        Customer savedCustomer = customerRepository.save(customer);

        // Mark lead as WON
        lead.setStatus(LeadStatus.WON);
        leadRepository.save(lead);

        CustomerDTO dto = new CustomerDTO();
        dto.setId(savedCustomer.getId());
        dto.setFirstName(savedCustomer.getFirstName());
        dto.setLastName(savedCustomer.getLastName());
        dto.setEmail(savedCustomer.getEmail());
        dto.setPhone(savedCustomer.getPhone());
        dto.setCompany(savedCustomer.getCompany());
        dto.setStatus(savedCustomer.getStatus());
        dto.setCreatedAt(savedCustomer.getCreatedAt());
        dto.setUpdatedAt(savedCustomer.getUpdatedAt());

        return dto;
    }
}
