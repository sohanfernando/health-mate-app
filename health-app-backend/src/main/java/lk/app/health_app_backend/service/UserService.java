package lk.app.health_app_backend.service;

import lk.app.health_app_backend.dto.request.UserCreateRequest;
import lk.app.health_app_backend.dto.request.UserLoginRequest;
import lk.app.health_app_backend.dto.response.GetUserResponse;

public interface UserService {
    GetUserResponse createUser(UserCreateRequest userCreateRequest);
    GetUserResponse login(UserLoginRequest userLoginRequest);
}
