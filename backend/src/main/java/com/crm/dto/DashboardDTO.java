package com.crm.dto;

import java.math.BigDecimal;
import java.util.List;

public class DashboardDTO {

    private long totalCustomers;
    private long activeCustomers;
    private long totalLeads;
    private long qualifiedLeads;
    private BigDecimal totalRevenue;
    private BigDecimal pipelineValue;
    private long pendingTasks;
    private long completedTasks;
    private List<LeadDTO> recentLeads;
    private List<?> recentSales;

    public DashboardDTO() {}

    public DashboardDTO(long totalCustomers, long activeCustomers, long totalLeads, long qualifiedLeads,
                        BigDecimal totalRevenue, BigDecimal pipelineValue, long pendingTasks, long completedTasks) {
        this.totalCustomers = totalCustomers;
        this.activeCustomers = activeCustomers;
        this.totalLeads = totalLeads;
        this.qualifiedLeads = qualifiedLeads;
        this.totalRevenue = totalRevenue;
        this.pipelineValue = pipelineValue;
        this.pendingTasks = pendingTasks;
        this.completedTasks = completedTasks;
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getActiveCustomers() {
        return activeCustomers;
    }

    public void setActiveCustomers(long activeCustomers) {
        this.activeCustomers = activeCustomers;
    }

    public long getTotalLeads() {
        return totalLeads;
    }

    public void setTotalLeads(long totalLeads) {
        this.totalLeads = totalLeads;
    }

    public long getQualifiedLeads() {
        return qualifiedLeads;
    }

    public void setQualifiedLeads(long qualifiedLeads) {
        this.qualifiedLeads = qualifiedLeads;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public BigDecimal getPipelineValue() {
        return pipelineValue;
    }

    public void setPipelineValue(BigDecimal pipelineValue) {
        this.pipelineValue = pipelineValue;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(long pendingTasks) {
        this.pendingTasks = pendingTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(long completedTasks) {
        this.completedTasks = completedTasks;
    }

    public List<LeadDTO> getRecentLeads() {
        return recentLeads;
    }

    public void setRecentLeads(List<LeadDTO> recentLeads) {
        this.recentLeads = recentLeads;
    }

    public List<?> getRecentSales() {
        return recentSales;
    }

    public void setRecentSales(List<?> recentSales) {
        this.recentSales = recentSales;
    }
}
