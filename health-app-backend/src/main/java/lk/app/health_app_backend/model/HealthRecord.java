package lk.app.health_app_backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "health_records")
@Data
public class HealthRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer age;

    private String gender;

    @Column(nullable = false)
    private Double height;

    @Column(nullable = false)
    private Double weight;

    private Double bmi;
    private Double bmr;
    private Double calorieNeeds;
    private LocalDate date;

    // New fields for advanced calculations
    private String activityLevel;
    private Double waist;
    private Double neck;
    private Double hip;
    private String weather;
    
    // Calculated advanced metrics
    private Double tdee;
    private Double idealBodyWeight;
    private Double bodyFatPercentage;
    private Double proteinGrams;
    private Double fatGrams;
    private Double carbsGrams;
    private Double waterIntakeLiters;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
