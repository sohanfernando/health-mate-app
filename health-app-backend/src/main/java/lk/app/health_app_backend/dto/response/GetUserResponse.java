package lk.app.health_app_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetUserResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
}
