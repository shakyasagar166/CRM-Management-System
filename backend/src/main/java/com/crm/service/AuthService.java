package com.crm.service;

import com.crm.dto.JwtAuthResponse;
import com.crm.dto.LoginRequest;
import com.crm.dto.RegisterRequest;

public interface AuthService {
    JwtAuthResponse login(LoginRequest loginRequest);
    String register(RegisterRequest registerRequest);
}
