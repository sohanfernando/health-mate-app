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
    
    // New advanced health metrics
    private Double tdee; // Total Daily Energy Expenditure
    private Double idealBodyWeight;
    private Double bodyFatPercentage;
    private Double proteinGrams;
    private Double fatGrams;
    private Double carbsGrams;
    private Double waterIntakeLiters;
    private String activityLevel;
    private Double waist;
    private Double neck;
    private Double hip;
    private String weather;
}
