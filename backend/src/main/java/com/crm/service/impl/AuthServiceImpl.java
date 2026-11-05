package com.crm.service.impl;

import com.crm.dto.JwtAuthResponse;
import com.crm.dto.LoginRequest;
import com.crm.dto.RegisterRequest;
import com.crm.entity.Role;
import com.crm.entity.User;
import com.crm.enums.UserRole;
import com.crm.repository.RoleRepository;
import com.crm.repository.UserRepository;
import com.crm.security.JwtTokenProvider;
import com.crm.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public JwtAuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(loginRequest.getUsernameOrEmail())
                .or(() -> userRepository.findByEmail(loginRequest.getUsernameOrEmail()))
                .orElse(null);

        Set<String> roles = user != null ? user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet()) : new HashSet<>();

        Long userId = user != null ? user.getId() : null;
        String username = user != null ? user.getUsername() : loginRequest.getUsernameOrEmail();
        String email = user != null ? user.getEmail() : "";

        return new JwtAuthResponse(token, userId, username, email, roles);
    }

    @Override
    public String register(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new IllegalArgumentException("Username is already taken!");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Email is already in use!");
        }

        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEnabled(true);

        Set<Role> roles = new HashSet<>();
        String requestedRole = registerRequest.getRole() != null && !registerRequest.getRole().isBlank()
                ? registerRequest.getRole()
                : UserRole.ROLE_SALES_REP.name();

        Role role = roleRepository.findByName(requestedRole)
                .orElseGet(() -> roleRepository.save(new Role(requestedRole)));
        roles.add(role);

        user.setRoles(roles);
        userRepository.save(user);

        return "User registered successfully!";
    }
}
