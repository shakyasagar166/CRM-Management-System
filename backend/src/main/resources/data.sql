-- Initial Seed Data for CRM Management System
-- Passwords are encrypted with BCrypt (password: password123)
-- Hash: $2a$10$y58n5Z9z.ZtzZ7g5gBln7uJzD3n9yRkm82c1pYc8X6wL8T7I9aKTu -> password123

INSERT INTO roles (id, name) VALUES (1, 'ROLE_ADMIN');
INSERT INTO roles (id, name) VALUES (2, 'ROLE_MANAGER');
INSERT INTO roles (id, name) VALUES (3, 'ROLE_SALES_REP');

INSERT INTO users (id, first_name, last_name, username, email, password, enabled, created_at)
VALUES (1, 'Admin', 'User', 'admin', 'admin@crm.com', '$2a$10$7JbzTjQOQ4qM2sB84m8y6eqDkP7C3.B.rX6U8aD/yqZ1Hlyp6e7QW', true, CURRENT_TIMESTAMP);

INSERT INTO users (id, first_name, last_name, username, email, password, enabled, created_at)
VALUES (2, 'Rahul', 'Sharma', 'rsharma', 'rahul.sharma@crm.com', '$2a$10$7JbzTjQOQ4qM2sB84m8y6eqDkP7C3.B.rX6U8aD/yqZ1Hlyp6e7QW', true, CURRENT_TIMESTAMP);

INSERT INTO users (id, first_name, last_name, username, email, password, enabled, created_at)
VALUES (3, 'Pooja', 'Verma', 'pverma', 'pooja.verma@crm.com', '$2a$10$7JbzTjQOQ4qM2sB84m8y6eqDkP7C3.B.rX6U8aD/yqZ1Hlyp6e7QW', true, CURRENT_TIMESTAMP);

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);
INSERT INTO user_roles (user_id, role_id) VALUES (3, 3);

-- Seed Customers
INSERT INTO customers (id, first_name, last_name, email, phone, company, address, city, country, status, created_at, updated_at)
VALUES (1, 'Amit', 'Patel', 'amit.patel@techsolutions.com', '+91-9876543210', 'TechSolutions Pvt Ltd', 'Sector 62', 'Noida', 'India', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO customers (id, first_name, last_name, email, phone, company, address, city, country, status, created_at, updated_at)
VALUES (2, 'Sneha', 'Kapoor', 'sneha.k@innovatehub.io', '+91-9823456789', 'InnovateHub Digital', 'Connaught Place', 'Delhi', 'India', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO customers (id, first_name, last_name, email, phone, company, address, city, country, status, created_at, updated_at)
VALUES (3, 'Vikram', 'Malhotra', 'vikram@malhotragroup.in', '+91-9911223344', 'Malhotra Enterprises', 'Cyber City', 'Gurugram', 'India', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO customers (id, first_name, last_name, email, phone, company, address, city, country, status, created_at, updated_at)
VALUES (4, 'Ananya', 'Roy', 'ananya.roy@apexsoft.com', '+91-9123456780', 'ApexSoft Solutions', 'Salt Lake', 'Kolkata', 'India', 'INACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Leads
INSERT INTO leads (id, first_name, last_name, email, phone, company, source, status, estimated_value, notes, created_at, updated_at)
VALUES (1, 'Rohan', 'Mehta', 'rohan.m@cloudcorp.com', '+91-9711223344', 'CloudCorp India', 'Website', 'QUALIFIED', 120000.00, 'Interested in Enterprise CRM deployment', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO leads (id, first_name, last_name, email, phone, company, source, status, estimated_value, notes, created_at, updated_at)
VALUES (2, 'Neha', 'Singhal', 'neha.s@fintechscale.org', '+91-9811334455', 'FintechScale Ltd', 'Referral', 'CONTACTED', 85000.00, 'Demo scheduled for next Tuesday', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO leads (id, first_name, last_name, email, phone, company, source, status, estimated_value, notes, created_at, updated_at)
VALUES (3, 'Karan', 'Chawla', 'karan.c@nexusecommerce.com', '+91-9988776655', 'Nexus Ecommerce', 'LinkedIn', 'NEW', 150000.00, 'Inquiry regarding automated sales pipeline', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO leads (id, first_name, last_name, email, phone, company, source, status, estimated_value, notes, created_at, updated_at)
VALUES (4, 'Deepak', 'Joshi', 'deepak.j@smartretail.com', '+91-9654321987', 'SmartRetail Co', 'Cold Call', 'PROPOSAL_SENT', 95000.00, 'Proposal shared; awaiting budget sign-off', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Sales
INSERT INTO sales (id, deal_name, amount, stage, expected_close_date, customer_id, created_at)
VALUES (1, 'Annual CRM License - TechSolutions', 120000.00, 'CLOSED_WON', '2026-10-15', 1, CURRENT_TIMESTAMP);

INSERT INTO sales (id, deal_name, amount, stage, expected_close_date, customer_id, created_at)
VALUES (2, 'Custom Integration Deal - InnovateHub', 85000.00, 'NEGOTIATION', '2026-11-20', 2, CURRENT_TIMESTAMP);

INSERT INTO sales (id, deal_name, amount, stage, expected_close_date, customer_id, created_at)
VALUES (3, 'Enterprise Support Package - Malhotra', 65000.00, 'PROSPECT', '2026-12-05', 3, CURRENT_TIMESTAMP);

-- Seed Tasks
INSERT INTO tasks (id, title, description, due_date, priority, status, assigned_to_user_id, created_at)
VALUES (1, 'Follow-up with Rohan Mehta', 'Send updated pricing matrix for 50 seats', '2026-11-08', 'HIGH', 'PENDING', 2, CURRENT_TIMESTAMP);

INSERT INTO tasks (id, title, description, due_date, priority, status, assigned_to_user_id, created_at)
VALUES (2, 'Prepare Contract for InnovateHub', 'Draft Master Services Agreement with SLA', '2026-11-10', 'MEDIUM', 'IN_PROGRESS', 3, CURRENT_TIMESTAMP);

INSERT INTO tasks (id, title, description, due_date, priority, status, assigned_to_user_id, created_at)
VALUES (3, 'Q3 Quarterly Review Deck', 'Compile dashboard metrics for leadership meeting', '2026-11-12', 'LOW', 'COMPLETED', 1, CURRENT_TIMESTAMP);

-- Seed FollowUps
INSERT INTO follow_ups (id, title, follow_up_date, type, notes, status, customer_id, created_at)
VALUES (1, 'Quarterly Health Check Call', '2026-11-15', 'CALL', 'Review customer feedback on recent patch', 'SCHEDULED', 1, CURRENT_TIMESTAMP);

INSERT INTO follow_ups (id, title, follow_up_date, type, notes, status, customer_id, created_at)
VALUES (2, 'Feature Walkthrough Meeting', '2026-11-18', 'MEETING', 'Online demo of custom workflows', 'SCHEDULED', 2, CURRENT_TIMESTAMP);
