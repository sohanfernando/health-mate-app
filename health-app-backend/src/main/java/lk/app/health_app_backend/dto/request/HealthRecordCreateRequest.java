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
    private String activityLevel; // sedentary, lightly_active, moderately_active, very_active, extremely_active
    private Double waist; // for body fat calculation
    private Double neck; // for body fat calculation
    private Double hip; // for body fat calculation (women only)
    private String weather; // hot, moderate, cold for water intake
}
