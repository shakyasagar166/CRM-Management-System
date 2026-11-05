package com.crm.service.impl;

import com.crm.dto.DashboardDTO;
import com.crm.dto.LeadDTO;
import com.crm.enums.LeadStatus;
import com.crm.enums.TaskStatus;
import com.crm.repository.CustomerRepository;
import com.crm.repository.LeadRepository;
import com.crm.repository.SalesRepository;
import com.crm.repository.TaskRepository;
import com.crm.service.DashboardService;
import com.crm.service.LeadService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final CustomerRepository customerRepository;
    private final LeadRepository leadRepository;
    private final SalesRepository salesRepository;
    private final TaskRepository taskRepository;
    private final LeadService leadService;

    public DashboardServiceImpl(CustomerRepository customerRepository,
                                LeadRepository leadRepository,
                                SalesRepository salesRepository,
                                TaskRepository taskRepository,
                                LeadService leadService) {
        this.customerRepository = customerRepository;
        this.leadRepository = leadRepository;
        this.salesRepository = salesRepository;
        this.taskRepository = taskRepository;
        this.leadService = leadService;
    }

    @Override
    public DashboardDTO getDashboardData() {
        long totalCustomers = customerRepository.count();
        long activeCustomers = customerRepository.countByStatus("ACTIVE");
        long totalLeads = leadRepository.count();
        long qualifiedLeads = leadRepository.countByStatus(LeadStatus.QUALIFIED);

        BigDecimal totalRevenue = salesRepository.getTotalWonRevenue();
        BigDecimal pipelineValue = salesRepository.getTotalPipelineValue();

        long pendingTasks = taskRepository.countByStatus(TaskStatus.PENDING);
        long completedTasks = taskRepository.countByStatus(TaskStatus.COMPLETED);

        DashboardDTO dto = new DashboardDTO(
                totalCustomers,
                activeCustomers,
                totalLeads,
                qualifiedLeads,
                totalRevenue,
                pipelineValue,
                pendingTasks,
                completedTasks
        );

        List<LeadDTO> recentLeads = leadService.getAllLeads().stream()
                .limit(5)
                .collect(Collectors.toList());
        dto.setRecentLeads(recentLeads);

        dto.setRecentSales(salesRepository.findAll().stream().limit(5).collect(Collectors.toList()));

        return dto;
    }
}
