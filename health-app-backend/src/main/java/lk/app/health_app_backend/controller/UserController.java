package lk.app.health_app_backend.controller;

import lk.app.health_app_backend.dto.request.UserCreateRequest;
import lk.app.health_app_backend.dto.request.UserLoginRequest;
import lk.app.health_app_backend.dto.response.AuthResponse;
import lk.app.health_app_backend.dto.response.GetUserResponse;
import lk.app.health_app_backend.service.impl.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lk.app.health_app_backend.config.JwtService;
import lk.app.health_app_backend.config.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private UserServiceImpl userServiceImpl;

    @Autowired
    private JwtService jwtService;
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<GetUserResponse> signup(@RequestBody UserCreateRequest userCreateRequest) {
        return ResponseEntity.ok(userServiceImpl.createUser(userCreateRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
        GetUserResponse user = userServiceImpl.login(userLoginRequest);
        var userDetails = userDetailsService.loadUserByUsername(userLoginRequest.getEmail());
        String jwt = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(jwt, user));
    }
}
