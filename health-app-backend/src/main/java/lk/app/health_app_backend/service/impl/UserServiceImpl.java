package lk.app.health_app_backend.service.impl;

import lk.app.health_app_backend.dto.request.UserCreateRequest;
import lk.app.health_app_backend.dto.request.UserLoginRequest;
import lk.app.health_app_backend.dto.response.GetUserResponse;
import lk.app.health_app_backend.exception.UserNotFoundException;
import lk.app.health_app_backend.exception.UserAlreadyExistException;
import lk.app.health_app_backend.model.User;
import lk.app.health_app_backend.repository.UserRepository;
import lk.app.health_app_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public GetUserResponse createUser(UserCreateRequest userCreateRequest){
        if (userRepository.findByEmail(userCreateRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistException("Email already exists");
        }
        if (!isPasswordStrong(userCreateRequest.getPassword())) {
            throw new IllegalArgumentException("Password must be at least 8 characters, contain a letter and a number");
        }
        User user = new User();
        user.setName(userCreateRequest.getName());
        user.setEmail(userCreateRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userCreateRequest.getPassword()));
        user.setRole("USER");
        userRepository.save(user);
        return new GetUserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    private boolean isPasswordStrong(String password) {
        if (password == null || password.length() < 8) return false;
        boolean hasLetter = false, hasDigit = false;
        for (char c : password.toCharArray()) {
            if (Character.isLetter(c)) hasLetter = true;
            if (Character.isDigit(c)) hasDigit = true;
        }
        return hasLetter && hasDigit;
    }

    @Override
    public GetUserResponse login(UserLoginRequest userLoginRequest){
        User user = userRepository.findByEmail(userLoginRequest.getEmail())
                .orElse(null);
        if (user == null || !passwordEncoder.matches(userLoginRequest.getPassword(), user.getPassword())) {
            throw new UserNotFoundException("Invalid credentials");
        }
        return new GetUserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
