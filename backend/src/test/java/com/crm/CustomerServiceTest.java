package com.crm;

import com.crm.dto.CustomerDTO;
import com.crm.entity.Customer;
import com.crm.exception.ResourceNotFoundException;
import com.crm.repository.CustomerRepository;
import com.crm.service.impl.CustomerServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CustomerServiceImpl customerService;

    private Customer customer;
    private CustomerDTO customerDTO;

    @BeforeEach
    void setUp() {
        customer = new Customer("Amit", "Patel", "amit.patel@test.com", "+91-9876543210", "TechCorp", "Sector 62", "Noida", "India", "ACTIVE");
        customer.setId(1L);

        customerDTO = new CustomerDTO(1L, "Amit", "Patel", "amit.patel@test.com", "+91-9876543210", "TechCorp", "Sector 62", "Noida", "India", "ACTIVE");
    }

    @Test
    void testCreateCustomer() {
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);

        CustomerDTO savedDTO = customerService.createCustomer(customerDTO);

        assertNotNull(savedDTO);
        assertEquals("Amit", savedDTO.getFirstName());
        assertEquals("TechCorp", savedDTO.getCompany());
        verify(customerRepository, times(1)).save(any(Customer.class));
    }

    @Test
    void testGetAllCustomers() {
        when(customerRepository.findAll()).thenReturn(Arrays.asList(customer));

        List<CustomerDTO> customers = customerService.getAllCustomers();

        assertEquals(1, customers.size());
        assertEquals("amit.patel@test.com", customers.get(0).getEmail());
        verify(customerRepository, times(1)).findAll();
    }

    @Test
    void testGetCustomerById_Success() {
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));

        CustomerDTO found = customerService.getCustomerById(1L);

        assertNotNull(found);
        assertEquals(1L, found.getId());
        assertEquals("Amit", found.getFirstName());
    }

    @Test
    void testGetCustomerById_NotFound() {
        when(customerRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> customerService.getCustomerById(99L));
    }

    @Test
    void testDeleteCustomer() {
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        doNothing().when(customerRepository).delete(customer);

        customerService.deleteCustomer(1L);

        verify(customerRepository, times(1)).delete(customer);
    }
}
