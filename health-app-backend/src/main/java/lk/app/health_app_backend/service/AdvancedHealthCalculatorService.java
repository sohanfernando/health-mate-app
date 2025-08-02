package lk.app.health_app_backend.service;

import lk.app.health_app_backend.dto.request.HealthRecordCreateRequest;
import lk.app.health_app_backend.model.HealthRecord;

public interface AdvancedHealthCalculatorService {
    
    /**
     * Calculate Total Daily Energy Expenditure (TDEE)
     * TDEE = BMR × Activity Multiplier
     */
    double calculateTDEE(double bmr, String activityLevel);
    
    /**
     * Calculate Ideal Body Weight using various formulas
     * For men: IBW = 50 + 2.3 × (height in inches - 60)
     * For women: IBW = 45.5 + 2.3 × (height in inches - 60)
     */
    double calculateIdealBodyWeight(double height, String gender, int age);
    
    /**
     * Calculate Body Fat Percentage using U.S. Navy method
     * For men: %BF = 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)) - 450
     * For women: %BF = 495 / (1.29579 - 0.35004 × log10(waist + hip - neck) + 0.22100 × log10(height)) - 450
     */
    double calculateBodyFatPercentage(double waist, double neck, Double hip, double height, String gender);
    
    /**
     * Calculate Macronutrient breakdown
     * Protein: 1.6-2.2g per kg body weight (for active individuals)
     * Fat: 20-35% of total calories
     * Carbs: Remaining calories
     */
    MacronutrientBreakdown calculateMacronutrients(double tdee, double weight);
    
    /**
     * Calculate daily water intake
     * Base: 30-35ml per kg body weight
     * Adjust for activity level and weather
     */
    double calculateWaterIntake(double weight, String activityLevel, String weather);
    
    /**
     * Apply all advanced calculations to a health record
     */
    void applyAdvancedCalculations(HealthRecord healthRecord, HealthRecordCreateRequest request);
    
    /**
     * Macronutrient breakdown result
     */
    class MacronutrientBreakdown {
        private double proteinGrams;
        private double fatGrams;
        private double carbsGrams;
        
        public MacronutrientBreakdown(double proteinGrams, double fatGrams, double carbsGrams) {
            this.proteinGrams = proteinGrams;
            this.fatGrams = fatGrams;
            this.carbsGrams = carbsGrams;
        }
        
        // Getters
        public double getProteinGrams() { return proteinGrams; }
        public double getFatGrams() { return fatGrams; }
        public double getCarbsGrams() { return carbsGrams; }
    }
} 