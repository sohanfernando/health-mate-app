package lk.app.health_app_backend.dto.response;

import lk.app.health_app_backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class GetHealthRecordResponse {
    private Long id;
    private Long userId;
    private Integer age;
    private String gender;
    private Double height;
    private Double weight;
    private Double bmi;
    private Double bmr;
    private Double calorieNeeds;
    private LocalDate date;
}
