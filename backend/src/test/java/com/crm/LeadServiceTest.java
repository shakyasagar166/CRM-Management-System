package com.crm;

import com.crm.dto.CustomerDTO;
import com.crm.dto.LeadDTO;
import com.crm.entity.Customer;
import com.crm.entity.Lead;
import com.crm.enums.LeadStatus;
import com.crm.exception.ResourceNotFoundException;
import com.crm.repository.CustomerRepository;
import com.crm.repository.LeadRepository;
import com.crm.service.impl.LeadServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LeadServiceTest {

    @Mock
    private LeadRepository leadRepository;

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private LeadServiceImpl leadService;

    private Lead lead;
    private LeadDTO leadDTO;

    @BeforeEach
    void setUp() {
        lead = new Lead("Rohan", "Mehta", "rohan@cloudcorp.com", "+91-9711223344", "CloudCorp", "Website", LeadStatus.QUALIFIED, new BigDecimal("120000.00"), "Enterprise CRM interest");
        lead.setId(10L);

        leadDTO = new LeadDTO(10L, "Rohan", "Mehta", "rohan@cloudcorp.com", "+91-9711223344", "CloudCorp", "Website", LeadStatus.QUALIFIED, new BigDecimal("120000.00"), "Enterprise CRM interest");
    }

    @Test
    void testCreateLead() {
        when(leadRepository.save(any(Lead.class))).thenReturn(lead);

        LeadDTO saved = leadService.createLead(leadDTO);

        assertNotNull(saved);
        assertEquals("Rohan", saved.getFirstName());
        assertEquals(LeadStatus.QUALIFIED, saved.getStatus());
        verify(leadRepository, times(1)).save(any(Lead.class));
    }

    @Test
    void testGetLeadById_Success() {
        when(leadRepository.findById(10L)).thenReturn(Optional.of(lead));

        LeadDTO found = leadService.getLeadById(10L);

        assertNotNull(found);
        assertEquals(10L, found.getId());
        assertEquals("CloudCorp", found.getCompany());
    }

    @Test
    void testConvertLeadToCustomer() {
        Customer customer = new Customer();
        customer.setId(50L);
        customer.setFirstName("Rohan");
        customer.setLastName("Mehta");
        customer.setEmail("rohan@cloudcorp.com");
        customer.setPhone("+91-9711223344");
        customer.setCompany("CloudCorp");
        customer.setStatus("ACTIVE");

        when(leadRepository.findById(10L)).thenReturn(Optional.of(lead));
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);
        when(leadRepository.save(any(Lead.class))).thenReturn(lead);

        CustomerDTO converted = leadService.convertLeadToCustomer(10L);

        assertNotNull(converted);
        assertEquals("Rohan", converted.getFirstName());
        assertEquals(50L, converted.getId());
        assertEquals(LeadStatus.WON, lead.getStatus());
        verify(customerRepository, times(1)).save(any(Customer.class));
        verify(leadRepository, times(1)).save(lead);
    }
}
