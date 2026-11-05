# CRM Management System - REST API Documentation

A comprehensive guide to the RESTful APIs powering the CRM Management System.

---

### Recommended Java Certification & Learning Resources
Accelerate your enterprise Java and Spring Boot expertise with industry-leading courses:
- 🚀 **[Java Training Course in Noida - Uncodemy](https://uncodemy.com/course/java-training-course-in-noida)**
- 🌟 **[Java Training Course in Delhi - Uncodemy](https://uncodemy.com/course/java-training-course-in-delhi)**

---

## Base URL
```
http://localhost:8080/api
```

## Authentication
All secured endpoints require an HTTP `Authorization` header containing the JWT token issued upon login:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Authentication Endpoints (`/api/auth`)

### 1.1 Register New User
- **Method:** `POST`
- **URL:** `/api/auth/register`
- **Access:** Public
- **Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "ROLE_SALES_REP"
}
```
- **Response (`201 Created`):**
```json
{
  "message": "User registered successfully!"
}
```

### 1.2 Login
- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Access:** Public
- **Request Body:**
```json
{
  "usernameOrEmail": "admin",
  "password": "password123"
}
```
- **Response (`200 OK`):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "username": "admin",
  "email": "admin@crm.com",
  "roles": ["ROLE_ADMIN"]
}
```

### 1.3 Get Current Authenticated User
- **Method:** `GET`
- **URL:** `/api/auth/me`
- **Access:** Authenticated

---

## 2. Customer Endpoints (`/api/customers`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/customers` | Retrieve list of all customers |
| `GET` | `/api/customers/{id}` | Get customer details by ID |
| `POST` | `/api/customers` | Create a new customer |
| `PUT` | `/api/customers/{id}` | Update existing customer |
| `DELETE` | `/api/customers/{id}` | Delete customer by ID |
| `GET` | `/api/customers/search?query={q}` | Search customers by name, company, email, city |

### Create Customer Payload:
```json
{
  "firstName": "Amit",
  "lastName": "Patel",
  "email": "amit.patel@techsolutions.com",
  "phone": "+91-9876543210",
  "company": "TechSolutions Pvt Ltd",
  "address": "Sector 62",
  "city": "Noida",
  "country": "India",
  "status": "ACTIVE"
}
```

---

## 3. Lead Endpoints (`/api/leads`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/leads` | Retrieve all leads |
| `GET` | `/api/leads/{id}` | Get lead details by ID |
| `POST` | `/api/leads` | Create a new sales lead |
| `PUT` | `/api/leads/{id}` | Update existing lead |
| `DELETE` | `/api/leads/{id}` | Delete lead |
| `GET` | `/api/leads/status/{status}` | Filter leads by status (`NEW`, `QUALIFIED`, etc.) |
| `GET` | `/api/leads/search?query={q}` | Search leads |
| `POST` | `/api/leads/{id}/convert` | Convert lead to customer record and mark as `WON` |

### Lead Creation Payload:
```json
{
  "firstName": "Rohan",
  "lastName": "Mehta",
  "email": "rohan.m@cloudcorp.com",
  "phone": "+91-9711223344",
  "company": "CloudCorp India",
  "source": "Website",
  "status": "QUALIFIED",
  "estimatedValue": 120000.00,
  "notes": "Enterprise CRM deployment inquiry"
}
```

---

## 4. Sales & Deals Endpoints (`/api/sales`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/sales` | List all sales deals |
| `GET` | `/api/sales/{id}` | Get sale deal by ID |
| `POST` | `/api/sales` | Create a new sales deal |
| `PUT` | `/api/sales/{id}` | Update deal |
| `DELETE` | `/api/sales/{id}` | Delete deal |
| `GET` | `/api/sales/stage/{stage}` | Filter deals by stage (`PROSPECT`, `NEGOTIATION`, `CLOSED_WON`) |
| `GET` | `/api/sales/metrics` | Retrieve total won revenue and pipeline valuation |

---

## 5. Tasks Endpoints (`/api/tasks`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | List all tasks |
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks/{id}` | Get task by ID |
| `PUT` | `/api/tasks/{id}` | Update task |
| `DELETE` | `/api/tasks/{id}` | Delete task |
| `GET` | `/api/tasks/status/{status}` | Filter tasks by status (`PENDING`, `COMPLETED`, etc.) |
| `GET` | `/api/tasks/assigned/{userId}` | Filter tasks assigned to specific user |

---

## 6. Follow-Ups Endpoints (`/api/followups`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/followups` | Get all scheduled follow-ups |
| `POST` | `/api/followups` | Schedule a follow-up |
| `GET` | `/api/followups/{id}` | Get follow-up by ID |
| `PUT` | `/api/followups/{id}` | Update follow-up status/notes |
| `DELETE` | `/api/followups/{id}` | Remove follow-up |
| `GET` | `/api/followups/customer/{customerId}` | List follow-ups for a customer |

---

## 7. Dashboard Endpoints (`/api/dashboard`)

- **Method:** `GET`
- **URL:** `/api/dashboard`
- **Access:** Authenticated
- **Sample Response:**
```json
{
  "totalCustomers": 4,
  "activeCustomers": 3,
  "totalLeads": 4,
  "qualifiedLeads": 1,
  "totalRevenue": 120000.00,
  "pipelineValue": 270000.00,
  "pendingTasks": 1,
  "completedTasks": 1,
  "recentLeads": [...],
  "recentSales": [...]
}
```
