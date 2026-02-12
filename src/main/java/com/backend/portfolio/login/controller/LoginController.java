package com.backend.portfolio.login.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.portfolio.login.dao.UserRequest;
import com.backend.portfolio.login.dao.UserUpdate;
import com.backend.portfolio.login.entity.Users;
import com.backend.portfolio.login.service.UserService;
import com.backend.portfolio.security.jwttoken.JwtUtils;
import com.backend.portfolio.security.jwttoken.LoginRequest;
import com.backend.portfolio.security.jwttoken.LoginResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class LoginController {
    private final UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/health")
    public Map<String, Boolean> getMethodName() {
        return Map.of("status", true);
    }

    @GetMapping("/all")
    public List<Users> getallusers() {
        return userService.allUsers();
    }

    @PostMapping("/authn")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateTokenFromEmail(userDetails);
        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ADMIN");

        return ResponseEntity.ok(
                new LoginResponse(
                        userDetails.getUsername(),
                        role,
                        jwt));
    }
    @PostMapping
    public Users creatUsers(@RequestBody UserRequest userRequest ) {
        return userService.creatUsers(userRequest);
    }
    @PutMapping
    public Map<String,String> updatepassword(@RequestBody UserUpdate userUpdate ) {
        userService.updatUserspassword(userUpdate);
        return Map.of("status","password_updated");
    }
    
}
