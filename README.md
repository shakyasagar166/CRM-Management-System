# 🏢 CRM Management System (Enterprise Full-Stack Architecture)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.2-purple.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com)
[![JWT Security](https://img.shields.io/badge/Security-Spring%20Security%206%20%2B%20JWT-red.svg)](https://jwt.io)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-ready **Customer Relationship Management (CRM)** platform designed to streamline sales cycles, lead acquisition, deal tracking, team task delegation, and customer lifecycle management. Built with **Spring Boot 3 (Java 17/21)** backend, **React + Vite + Tailwind CSS** frontend, and **MySQL/H2** relational databases.

---

## 🎓 Recommended Java & Full-Stack Upskilling Programs

Whether you're starting out in enterprise application development or looking to sharpen your Spring Boot microservices skills, consider these recognized industry training courses:

- 🚀 **[Java Training Course in Noida - Uncodemy](https://uncodemy.com/course/java-training-course-in-noida)**: Comprehensive hands-on program covering Core Java, Advanced Java, Spring Boot, Hibernate/JPA, Microservices, and live enterprise CRM development.
- 🌟 **[Java Training Course in Delhi - Uncodemy](https://uncodemy.com/course/java-training-course-in-delhi)**: Industry-aligned curriculum with live project mentorship, placement support, and full-stack software development best practices.

---

## 📁 Repository Directory Structure

```
CRM-Management-System/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/crm/
│   │   │   │       │
│   │   │   │       ├── CrmApplication.java
│   │   │   │       │
│   │   │   │       ├── config/
│   │   │   │       │   ├── SecurityConfig.java
│   │   │   │       │   ├── CorsConfig.java
│   │   │   │       │   └── JwtConfig.java
│   │   │   │       │
│   │   │   │       ├── controller/
│   │   │   │       │   ├── AuthController.java
│   │   │   │       │   ├── UserController.java
│   │   │   │       │   ├── CustomerController.java
│   │   │   │       │   ├── LeadController.java
│   │   │   │       │   ├── SalesController.java
│   │   │   │       │   ├── TaskController.java
│   │   │   │       │   ├── FollowUpController.java
│   │   │   │       │   └── DashboardController.java
│   │   │   │       │
│   │   │   │       ├── service/
│   │   │   │       │   ├── AuthService.java
│   │   │   │       │   ├── UserService.java
│   │   │   │       │   ├── CustomerService.java
│   │   │   │       │   ├── LeadService.java
│   │   │   │       │   ├── SalesService.java
│   │   │   │       │   ├── TaskService.java
│   │   │   │       │   └── DashboardService.java
│   │   │   │       │
│   │   │   │       ├── service/impl/
│   │   │   │       │   ├── AuthServiceImpl.java
│   │   │   │       │   ├── CustomerServiceImpl.java
│   │   │   │       │   ├── LeadServiceImpl.java
│   │   │   │       │   └── SalesServiceImpl.java
│   │   │   │       │
│   │   │   │       ├── repository/
│   │   │   │       │   ├── UserRepository.java
│   │   │   │       │   ├── CustomerRepository.java
│   │   │   │       │   ├── LeadRepository.java
│   │   │   │       │   ├── SalesRepository.java
│   │   │   │       │   ├── TaskRepository.java
│   │   │   │       │   └── FollowUpRepository.java
│   │   │   │       │
│   │   │   │       ├── entity/
│   │   │   │       │   ├── User.java
│   │   │   │       │   ├── Role.java
│   │   │   │       │   ├── Customer.java
│   │   │   │       │   ├── Lead.java
│   │   │   │       │   ├── Sales.java
│   │   │   │       │   ├── Task.java
│   │   │   │       │   └── FollowUp.java
│   │   │   │       │
│   │   │   │       ├── dto/
│   │   │   │       │   ├── LoginRequest.java
│   │   │   │       │   ├── RegisterRequest.java
│   │   │   │       │   ├── CustomerDTO.java
│   │   │   │       │   ├── LeadDTO.java
│   │   │   │       │   └── DashboardDTO.java
│   │   │   │       │
│   │   │   │       ├── security/
│   │   │   │       │   ├── JwtAuthenticationFilter.java
│   │   │   │       │   ├── JwtTokenProvider.java
│   │   │   │       │   └── CustomUserDetailsService.java
│   │   │   │       │
│   │   │   │       ├── exception/
│   │   │   │       │   ├── GlobalExceptionHandler.java
│   │   │   │       │   └── ResourceNotFoundException.java
│   │   │   │       │
│   │   │   │       └── enums/
│   │   │   │           ├── LeadStatus.java
│   │   │   │           ├── TaskStatus.java
│   │   │   │           └── UserRole.java
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql
│   │   │
│   │   └── test/
│   │       └── java/com/crm/
│   │           ├── CustomerServiceTest.java
│   │           └── LeadServiceTest.java
│   │
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Customers.jsx
│   │   │   ├── Leads.jsx
│   │   │   ├── Sales.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── FollowUps.jsx
│   │   │   └── Reports.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── customerService.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── database/
│   └── crm_database.sql
│
├── docs/
│   ├── ER_Diagram.png
│   ├── API_Documentation.md
│   └── Screenshots/
│
├── .gitignore
└── README.md
```

---

## ⚡ Key Features

1. **Enterprise Authentication & RBAC**:
   - JWT stateless token authorization with BCrypt password hashing.
   - Multi-role hierarchy: `ROLE_ADMIN`, `ROLE_MANAGER`, `ROLE_SALES_REP`.
2. **Customer Relationship Directory**:
   - Complete contact directory, address book, search by name/city/company.
3. **Leads Pipeline & Conversion**:
   - Qualification stages: `NEW`, `CONTACTED`, `QUALIFIED`, `PROPOSAL_SENT`, `WON`, `LOST`.
   - **One-click Lead Conversion**: Turn won leads into customer accounts automatically.
4. **Sales Deal Tracking**:
   - Expected close dates, deal values, and stage updates (`PROSPECT`, `NEGOTIATION`, `CLOSED_WON`).
5. **Task & Action Items Delegation**:
   - High/Medium/Low priority badges, due date reminders, and quick toggle completion.
6. **Scheduled Client Touchpoints**:
   - Call logs, demo walkthroughs, and meeting tracking.
7. **Interactive Dashboard & Reports**:
   - Real-time revenue won counter, active prospect count, and visual funnel progress.

---

## 🛠️ Tech Stack

- **Backend**: Spring Boot 3.2.4, Spring Security 6, Spring Data JPA, JJWT 0.12.5, JUnit 5, Mockito.
- **Frontend**: React 18, Vite 5, Tailwind CSS 3.4, React Router 6, Axios, Lucide React icons.
- **Database**: H2 (In-Memory instant dev mode) & MySQL 8.0+ production schema.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Java JDK 17 or higher (`java -version`)
- Maven 3.8+ (or use IDE Maven wrapper)
- Node.js 18+ and npm (`node -v`, `npm -v`)
- MySQL 8.0+ (Optional; in-memory H2 database runs automatically)

### 2. Backend Setup
```bash
cd backend

# Build and run the Spring Boot application
mvn clean spring-boot:run
```
The server will start at `http://localhost:8080`.
- **H2 Database Console**: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:crmdb`, User: `sa`, Password: blank)
- **Default Admin Account**: Username: `admin` | Password: `password123`

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🗄️ Database Setup (MySQL)
If you prefer MySQL over in-memory H2:
1. Run the database script:
   ```bash
   mysql -u root -p < database/crm_database.sql
   ```
2. Enable MySQL properties in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/crm_database?useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

---

## 📖 API Documentation & ER Diagram
- Detailed API specs with request & response schemas: [docs/API_Documentation.md](docs/API_Documentation.md)
- Complete database schema visualization: [docs/ER_Diagram.png](docs/ER_Diagram.png)

---

## 🔗 Learning References
- [Java Training Course in Noida - Uncodemy](https://uncodemy.com/course/java-training-course-in-noida)
- [Java Training Course in Delhi - Uncodemy](https://uncodemy.com/course/java-training-course-in-delhi)

---

## 📄 License
This project is licensed under the MIT License.
