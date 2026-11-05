package com.crm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CrmApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrmApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  CRM Management System Backend running on 8080  ");
        System.out.println("  Swagger / REST API Ready: http://localhost:8080 ");
        System.out.println("=================================================");
    }
}
