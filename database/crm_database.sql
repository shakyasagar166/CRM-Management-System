-- ========================================================
-- CRM Management System - Full Database Schema & Seed Data
-- Compatible with MySQL 8.0+ & MariaDB
-- ========================================================

CREATE DATABASE IF NOT EXISTS crm_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE crm_database;

-- Disable Foreign Key checks during schema setup
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS follow_ups;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS leads;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- 1. Roles Table
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    username VARCHAR(60) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. User Roles Join Table
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Customers Table
CREATE TABLE customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    company VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(60),
    country VARCHAR(60) DEFAULT 'India',
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_customer_email (email),
    INDEX idx_customer_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Leads Table
CREATE TABLE leads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(100),
    source VARCHAR(60),
    status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    estimated_value DECIMAL(12, 2) DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_lead_status (status),
    INDEX idx_lead_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Sales / Deals Table
CREATE TABLE sales (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    deal_name VARCHAR(120) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    stage VARCHAR(40) NOT NULL DEFAULT 'PROSPECT',
    expected_close_date DATE,
    customer_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sales_customer FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE SET NULL,
    INDEX idx_sales_stage (stage)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Tasks Table
CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    assigned_to_user_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tasks_user FOREIGN KEY (assigned_to_user_id) REFERENCES users (id) ON DELETE SET NULL,
    INDEX idx_task_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Follow-Ups Table
CREATE TABLE follow_ups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    follow_up_date DATE NOT NULL,
    type VARCHAR(30) NOT NULL DEFAULT 'CALL',
    notes TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED',
    customer_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_followup_customer FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE,
    INDEX idx_followup_date (follow_up_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Enable Foreign Key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ========================================================
-- Seed Data
-- Default password: password123 (BCrypt hash)
-- ========================================================

-- Roles
INSERT INTO roles (id, name) VALUES 
(1, 'ROLE_ADMIN'),
(2, 'ROLE_MANAGER'),
(3, 'ROLE_SALES_REP');

-- Users
INSERT INTO users (id, first_name, last_name, username, email, password, enabled) VALUES 
(1, 'Admin', 'User', 'admin', 'admin@crm.com', '$2a$10$7JbzTjQOQ4qM2sB84m8y6eqDkP7C3.B.rX6U8aD/yqZ1Hlyp6e7QW', 1),
(2, 'Rahul', 'Sharma', 'rsharma', 'rahul.sharma@crm.com', '$2a$10$7JbzTjQOQ4qM2sB84m8y6eqDkP7C3.B.rX6U8aD/yqZ1Hlyp6e7QW', 1),
(3, 'Pooja', 'Verma', 'pverma', 'pooja.verma@crm.com', '$2a$10$7JbzTjQOQ4qM2sB84m8y6eqDkP7C3.B.rX6U8aD/yqZ1Hlyp6e7QW', 1);

-- User Role Assignments
INSERT INTO user_roles (user_id, role_id) VALUES 
(1, 1),
(2, 2),
(3, 3);

-- Customers
INSERT INTO customers (id, first_name, last_name, email, phone, company, address, city, country, status) VALUES 
(1, 'Amit', 'Patel', 'amit.patel@techsolutions.com', '+91-9876543210', 'TechSolutions Pvt Ltd', 'Sector 62', 'Noida', 'India', 'ACTIVE'),
(2, 'Sneha', 'Kapoor', 'sneha.k@innovatehub.io', '+91-9823456789', 'InnovateHub Digital', 'Connaught Place', 'Delhi', 'India', 'ACTIVE'),
(3, 'Vikram', 'Malhotra', 'vikram@malhotragroup.in', '+91-9911223344', 'Malhotra Enterprises', 'Cyber City', 'Gurugram', 'India', 'ACTIVE'),
(4, 'Ananya', 'Roy', 'ananya.roy@apexsoft.com', '+91-9123456780', 'ApexSoft Solutions', 'Salt Lake Sector V', 'Kolkata', 'India', 'INACTIVE');

-- Leads
INSERT INTO leads (id, first_name, last_name, email, phone, company, source, status, estimated_value, notes) VALUES 
(1, 'Rohan', 'Mehta', 'rohan.m@cloudcorp.com', '+91-9711223344', 'CloudCorp India', 'Website', 'QUALIFIED', 120000.00, 'Requires multi-tenant CRM with custom reporting module'),
(2, 'Neha', 'Singhal', 'neha.s@fintechscale.org', '+91-9811334455', 'FintechScale Ltd', 'Referral', 'CONTACTED', 85000.00, 'Product demo scheduled for upcoming sprint'),
(3, 'Karan', 'Chawla', 'karan.c@nexusecommerce.com', '+91-9988776655', 'Nexus Ecommerce', 'LinkedIn', 'NEW', 150000.00, 'Needs lead pipeline synchronization with Shopify stores'),
(4, 'Deepak', 'Joshi', 'deepak.j@smartretail.com', '+91-9654321987', 'SmartRetail Co', 'Cold Call', 'PROPOSAL_SENT', 95000.00, 'Sent commercial quotation; awaiting management review');

-- Sales Deals
INSERT INTO sales (id, deal_name, amount, stage, expected_close_date, customer_id) VALUES 
(1, 'Annual CRM License - TechSolutions', 120000.00, 'CLOSED_WON', '2026-10-15', 1),
(2, 'Custom Integration Deal - InnovateHub', 85000.00, 'NEGOTIATION', '2026-11-20', 2),
(3, 'Enterprise Support Package - Malhotra', 65000.00, 'PROSPECT', '2026-12-05', 3);

-- Tasks
INSERT INTO tasks (id, title, description, due_date, priority, status, assigned_to_user_id) VALUES 
(1, 'Follow-up with Rohan Mehta', 'Send updated pricing matrix for 50 licenses', '2026-11-08', 'HIGH', 'PENDING', 2),
(2, 'Prepare Contract for InnovateHub', 'Draft Master Services Agreement with 99.9% SLA', '2026-11-10', 'MEDIUM', 'IN_PROGRESS', 3),
(3, 'Q3 Quarterly Review Deck', 'Compile dashboard KPI metrics for leadership presentation', '2026-11-12', 'LOW', 'COMPLETED', 1);

-- Follow-Ups
INSERT INTO follow_ups (id, title, follow_up_date, type, notes, status, customer_id) VALUES 
(1, 'Quarterly Health Check Call', '2026-11-15', 'CALL', 'Review customer satisfaction on recent update release', 'SCHEDULED', 1),
(2, 'Feature Walkthrough Meeting', '2026-11-18', 'MEETING', 'Walkthrough of lead conversion and sales pipeline dashboard', 'SCHEDULED', 2);
