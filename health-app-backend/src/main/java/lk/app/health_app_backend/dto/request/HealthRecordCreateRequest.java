package lk.app.health_app_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class HealthRecordCreateRequest {
    private Integer age;
    private String gender;
    private Double height;
    private Double weight;
}
