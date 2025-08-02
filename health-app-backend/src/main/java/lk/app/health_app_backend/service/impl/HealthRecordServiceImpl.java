package lk.app.health_app_backend.service.impl;

import lk.app.health_app_backend.dto.request.HealthRecordCreateRequest;
import lk.app.health_app_backend.dto.response.GetHealthRecordResponse;
import lk.app.health_app_backend.exception.HealthRecordNotFoundException;
import lk.app.health_app_backend.model.HealthRecord;
import lk.app.health_app_backend.model.User;
import lk.app.health_app_backend.repository.HealthRecordRepository;
import lk.app.health_app_backend.service.AdvancedHealthCalculatorService;
import lk.app.health_app_backend.service.HealthRecordService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class HealthRecordServiceImpl implements HealthRecordService {
    private HealthRecordRepository healthRecordRepository;
    private AdvancedHealthCalculatorService advancedHealthCalculatorService;

    @Override
    public GetHealthRecordResponse createHealthRecord(HealthRecordCreateRequest healthRecordCreateRequest, User user) {
        HealthRecord healthRecord = new HealthRecord();
        healthRecord.setAge(healthRecordCreateRequest.getAge());
        healthRecord.setGender(healthRecordCreateRequest.getGender());
        healthRecord.setHeight(healthRecordCreateRequest.getHeight());
        healthRecord.setWeight(healthRecordCreateRequest.getWeight());

        // Calculate BMI
        Double heightInMeters = healthRecord.getHeight() / 100.0;
        Double bmi = healthRecord.getWeight() / (heightInMeters * heightInMeters);
        healthRecord.setBmi(bmi);

        // Calculate BMR (Mifflin-St Jeor Equation)
        Double bmr;
        if ("male".equalsIgnoreCase(healthRecord.getGender())) {
            bmr = 10 * healthRecord.getWeight() + 6.25 * healthRecord.getHeight() - 5 * healthRecord.getAge() + 5;
        } else {
            bmr = 10 * healthRecord.getWeight() + 6.25 * healthRecord.getHeight() - 5 * healthRecord.getAge() - 161;
        }
        healthRecord.setBmr(bmr);

        // Estimate daily calorie needs (BMR * 1.2 for sedentary)
        Double calorieNeeds = bmr * 1.2;
        healthRecord.setCalorieNeeds(calorieNeeds);

        // Apply advanced health calculations
        advancedHealthCalculatorService.applyAdvancedCalculations(healthRecord, healthRecordCreateRequest);

        // Set current date
        healthRecord.setDate(java.time.LocalDate.now());

        // Associate with user
        healthRecord.setUser(user);

        // Save health record
        healthRecordRepository.save(healthRecord);

        return new GetHealthRecordResponse(
            healthRecord.getId(),
            user.getId(),
            healthRecord.getAge(),
            healthRecord.getGender(),
            healthRecord.getHeight(),
            healthRecord.getWeight(),
            healthRecord.getBmi(),
            healthRecord.getBmr(),
            healthRecord.getCalorieNeeds(),
            healthRecord.getDate(),
            healthRecord.getTdee(),
            healthRecord.getIdealBodyWeight(),
            healthRecord.getBodyFatPercentage(),
            healthRecord.getProteinGrams(),
            healthRecord.getFatGrams(),
            healthRecord.getCarbsGrams(),
            healthRecord.getWaterIntakeLiters(),
            healthRecord.getActivityLevel(),
            healthRecord.getWaist(),
            healthRecord.getNeck(),
            healthRecord.getHip(),
            healthRecord.getWeather()
        );
    }

    @Override
    public GetHealthRecordResponse getHealthRecord(Long id) {
        HealthRecord healthRecord = healthRecordRepository.findById(id)
                .orElseThrow(() -> new HealthRecordNotFoundException("Health record not found"));

        return new GetHealthRecordResponse(
            healthRecord.getId(),
            healthRecord.getUser() != null ? healthRecord.getUser().getId() : null,
            healthRecord.getAge(),
            healthRecord.getGender(),
            healthRecord.getHeight(),
            healthRecord.getWeight(),
            healthRecord.getBmi(),
            healthRecord.getBmr(),
            healthRecord.getCalorieNeeds(),
            healthRecord.getDate(),
            healthRecord.getTdee(),
            healthRecord.getIdealBodyWeight(),
            healthRecord.getBodyFatPercentage(),
            healthRecord.getProteinGrams(),
            healthRecord.getFatGrams(),
            healthRecord.getCarbsGrams(),
            healthRecord.getWaterIntakeLiters(),
            healthRecord.getActivityLevel(),
            healthRecord.getWaist(),
            healthRecord.getNeck(),
            healthRecord.getHip(),
            healthRecord.getWeather()
        );
    }
}
