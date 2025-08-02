package lk.app.health_app_backend.service.impl;

import lk.app.health_app_backend.dto.request.HealthRecordCreateRequest;
import lk.app.health_app_backend.model.HealthRecord;
import lk.app.health_app_backend.service.AdvancedHealthCalculatorService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdvancedHealthCalculatorServiceImpl implements AdvancedHealthCalculatorService {
    
    // Activity level multipliers for TDEE calculation
    private static final Map<String, Double> ACTIVITY_MULTIPLIERS = new HashMap<>();
    static {
        ACTIVITY_MULTIPLIERS.put("sedentary", 1.2);           // Little or no exercise
        ACTIVITY_MULTIPLIERS.put("lightly_active", 1.375);    // Light exercise 1-3 days/week
        ACTIVITY_MULTIPLIERS.put("moderately_active", 1.55);  // Moderate exercise 3-5 days/week
        ACTIVITY_MULTIPLIERS.put("very_active", 1.725);       // Hard exercise 6-7 days/week
        ACTIVITY_MULTIPLIERS.put("extremely_active", 1.9);    // Very hard exercise, physical job
    }
    
    @Override
    public double calculateTDEE(double bmr, String activityLevel) {
        Double multiplier = ACTIVITY_MULTIPLIERS.get(activityLevel.toLowerCase());
        if (multiplier == null) {
            multiplier = 1.2; // Default to sedentary
        }
        return bmr * multiplier;
    }
    
    @Override
    public double calculateIdealBodyWeight(double height, String gender, int age) {
        // Convert height from cm to inches
        double heightInches = height / 2.54;
        
        double baseWeight;
        if ("male".equalsIgnoreCase(gender)) {
            baseWeight = 50.0; // Base weight for men (kg)
        } else {
            baseWeight = 45.5; // Base weight for women (kg)
        }
        
        // Calculate IBW using the formula
        double ibw = baseWeight + 2.3 * (heightInches - 60);
        
        // Adjust for age (slight reduction for older adults)
        if (age > 50) {
            ibw *= 0.95;
        }
        
        return Math.max(ibw, 30.0); // Minimum reasonable weight
    }
    
    @Override
    public double calculateBodyFatPercentage(double waist, double neck, Double hip, double height, String gender) {
        if (waist <= 0 || neck <= 0 || height <= 0) {
            return 0.0;
        }
        
        // Convert measurements to inches
        double waistInches = waist / 2.54;
        double neckInches = neck / 2.54;
        double heightInches = height / 2.54;
        
        double bodyFatPercentage;
        
        if ("male".equalsIgnoreCase(gender)) {
            // U.S. Navy method for men
            double logWaistNeck = Math.log10(waistInches - neckInches);
            double logHeight = Math.log10(heightInches);
            bodyFatPercentage = 495 / (1.0324 - 0.19077 * logWaistNeck + 0.15456 * logHeight) - 450;
        } else {
            // U.S. Navy method for women (requires hip measurement)
            if (hip == null || hip <= 0) {
                return 0.0;
            }
            double hipInches = hip / 2.54;
            double logWaistHipNeck = Math.log10(waistInches + hipInches - neckInches);
            double logHeight = Math.log10(heightInches);
            bodyFatPercentage = 495 / (1.29579 - 0.35004 * logWaistHipNeck + 0.22100 * logHeight) - 450;
        }
        
        // Ensure reasonable range (5% to 50%)
        return Math.max(5.0, Math.min(50.0, bodyFatPercentage));
    }
    
    @Override
    public MacronutrientBreakdown calculateMacronutrients(double tdee, double weight) {
        // Protein: 1.8g per kg body weight (moderate activity level)
        double proteinGrams = weight * 1.8;
        double proteinCalories = proteinGrams * 4; // 4 calories per gram
        
        // Fat: 25% of total calories
        double fatCalories = tdee * 0.25;
        double fatGrams = fatCalories / 9; // 9 calories per gram
        
        // Carbs: remaining calories
        double carbCalories = tdee - proteinCalories - fatCalories;
        double carbsGrams = carbCalories / 4; // 4 calories per gram
        
        return new MacronutrientBreakdown(proteinGrams, fatGrams, carbsGrams);
    }
    
    @Override
    public double calculateWaterIntake(double weight, String activityLevel, String weather) {
        // Base water intake: 35ml per kg body weight
        double baseWater = weight * 35;
        
        // Activity level adjustments
        double activityMultiplier = 1.0;
        switch (activityLevel.toLowerCase()) {
            case "sedentary":
                activityMultiplier = 1.0;
                break;
            case "lightly_active":
                activityMultiplier = 1.1;
                break;
            case "moderately_active":
                activityMultiplier = 1.2;
                break;
            case "very_active":
                activityMultiplier = 1.3;
                break;
            case "extremely_active":
                activityMultiplier = 1.4;
                break;
        }
        
        // Weather adjustments
        double weatherMultiplier = 1.0;
        switch (weather.toLowerCase()) {
            case "hot":
                weatherMultiplier = 1.2;
                break;
            case "moderate":
                weatherMultiplier = 1.0;
                break;
            case "cold":
                weatherMultiplier = 0.9;
                break;
        }
        
        double totalWater = baseWater * activityMultiplier * weatherMultiplier;
        
        // Convert to liters and ensure reasonable range (1.5L to 5L)
        double waterLiters = totalWater / 1000;
        return Math.max(1.5, Math.min(5.0, waterLiters));
    }
    
    @Override
    public void applyAdvancedCalculations(HealthRecord healthRecord, HealthRecordCreateRequest request) {
        // Set input fields
        healthRecord.setActivityLevel(request.getActivityLevel());
        healthRecord.setWaist(request.getWaist());
        healthRecord.setNeck(request.getNeck());
        healthRecord.setHip(request.getHip());
        healthRecord.setWeather(request.getWeather());
        
        // Calculate advanced metrics
        if (healthRecord.getBmr() != null && request.getActivityLevel() != null) {
            healthRecord.setTdee(calculateTDEE(healthRecord.getBmr(), request.getActivityLevel()));
        }
        
        if (request.getHeight() != null && request.getGender() != null && request.getAge() != null) {
            healthRecord.setIdealBodyWeight(calculateIdealBodyWeight(
                request.getHeight(), request.getGender(), request.getAge()));
        }
        
        if (request.getWaist() != null && request.getNeck() != null && 
            request.getHeight() != null && request.getGender() != null) {
            healthRecord.setBodyFatPercentage(calculateBodyFatPercentage(
                request.getWaist(), request.getNeck(), request.getHip(), 
                request.getHeight(), request.getGender()));
        }
        
        if (healthRecord.getTdee() != null && request.getWeight() != null) {
            MacronutrientBreakdown macros = calculateMacronutrients(healthRecord.getTdee(), request.getWeight());
            healthRecord.setProteinGrams(macros.getProteinGrams());
            healthRecord.setFatGrams(macros.getFatGrams());
            healthRecord.setCarbsGrams(macros.getCarbsGrams());
        }
        
        if (request.getWeight() != null && request.getActivityLevel() != null && request.getWeather() != null) {
            healthRecord.setWaterIntakeLiters(calculateWaterIntake(
                request.getWeight(), request.getActivityLevel(), request.getWeather()));
        }
    }
} 