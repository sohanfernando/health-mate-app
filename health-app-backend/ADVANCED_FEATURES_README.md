# Advanced Health Calculator Features

This document describes the new advanced health calculator features that have been added to the HealthApp.

## New Features Added

### 1. TDEE (Total Daily Energy Expenditure) Calculator
- **What it does**: Calculates your total daily calorie needs based on your activity level
- **Formula**: TDEE = BMR × Activity Multiplier
- **Activity Levels**:
  - Sedentary (1.2x): Little or no exercise
  - Lightly Active (1.375x): Light exercise 1-3 days/week
  - Moderately Active (1.55x): Moderate exercise 3-5 days/week
  - Very Active (1.725x): Hard exercise 6-7 days/week
  - Extremely Active (1.9x): Very hard exercise, physical job

### 2. Ideal Body Weight (IBW) Calculator
- **What it does**: Calculates your ideal body weight based on height, gender, and age
- **Formula**:
  - Men: IBW = 50 + 2.3 × (height in inches - 60)
  - Women: IBW = 45.5 + 2.3 × (height in inches - 60)
- **Age adjustment**: Slight reduction for adults over 50

### 3. Body Fat Percentage Estimator
- **What it does**: Estimates body fat percentage using the U.S. Navy method
- **Required measurements**:
  - Waist circumference
  - Neck circumference
  - Hip circumference (for women only)
- **Formula**:
  - Men: %BF = 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)) - 450
  - Women: %BF = 495 / (1.29579 - 0.35004 × log10(waist + hip - neck) + 0.22100 × log10(height)) - 450

### 4. Macronutrient Calculator
- **What it does**: Splits your total calorie intake into protein, fat, and carbohydrate goals
- **Breakdown**:
  - Protein: 1.8g per kg body weight (for active individuals)
  - Fat: 25% of total calories
  - Carbohydrates: Remaining calories
- **Calories per gram**:
  - Protein: 4 calories/gram
  - Fat: 9 calories/gram
  - Carbohydrates: 4 calories/gram

### 5. Water Intake Calculator
- **What it does**: Suggests daily water intake based on weight, activity level, and weather
- **Base calculation**: 35ml per kg body weight
- **Activity adjustments**:
  - Sedentary: 1.0x
  - Lightly Active: 1.1x
  - Moderately Active: 1.2x
  - Very Active: 1.3x
  - Extremely Active: 1.4x
- **Weather adjustments**:
  - Hot: 1.2x
  - Moderate: 1.0x
  - Cold: 0.9x

## Database Changes

The following new columns have been added to the `health_records` table:

### Input Fields
- `activity_level` (VARCHAR): User's activity level
- `waist` (DOUBLE): Waist circumference in cm
- `neck` (DOUBLE): Neck circumference in cm
- `hip` (DOUBLE): Hip circumference in cm
- `weather` (VARCHAR): Weather condition

### Calculated Fields
- `tdee` (DOUBLE): Total Daily Energy Expenditure
- `ideal_body_weight` (DOUBLE): Ideal body weight in kg
- `body_fat_percentage` (DOUBLE): Body fat percentage
- `protein_grams` (DOUBLE): Recommended protein intake
- `fat_grams` (DOUBLE): Recommended fat intake
- `carbs_grams` (DOUBLE): Recommended carbohydrate intake
- `water_intake_liters` (DOUBLE): Recommended daily water intake

## API Changes

### Request DTO (`HealthRecordCreateRequest`)
Added new optional fields:
```json
{
  "age": 25,
  "gender": "male",
  "height": 175,
  "weight": 70,
  "activityLevel": "moderately_active",
  "waist": 80,
  "neck": 40,
  "hip": null,
  "weather": "moderate"
}
```

### Response DTO (`GetHealthRecordResponse`)
Added new calculated fields:
```json
{
  "id": 1,
  "userId": 1,
  "age": 25,
  "gender": "male",
  "height": 175,
  "weight": 70,
  "bmi": 22.9,
  "bmr": 1650,
  "calorieNeeds": 1980,
  "date": "2024-01-15",
  "tdee": 2557,
  "idealBodyWeight": 68.5,
  "bodyFatPercentage": 15.2,
  "proteinGrams": 126,
  "fatGrams": 71,
  "carbsGrams": 288,
  "waterIntakeLiters": 2.8,
  "activityLevel": "moderately_active",
  "waist": 80,
  "neck": 40,
  "hip": null,
  "weather": "moderate"
}
```

## Frontend Changes

### CalculatorForm Component
- Added sections for Activity Level, Body Measurements, and Weather Conditions
- Organized form into logical sections for better UX
- Added validation for required fields (hip measurement for women)

### ResultCard Component
- Displays all new calculated metrics in organized sections
- Color-coded macronutrient breakdown
- Shows percentage breakdown of macronutrients
- Conditional display of body measurements

### HistoryTable Component
- Added columns for TDEE, Ideal Body Weight, Body Fat %, Water Intake, and Activity Level
- Improved table layout to accommodate new data

### Dashboard Component
- Updated to show exact total record count
- Refreshes automatically when new calculations are made

## Usage Instructions

1. **Start the backend application** - The new columns will be automatically added to the database
2. **Fill out the enhanced calculator form** with your measurements
3. **Optional body measurements** - Fill in waist, neck, and hip measurements for body fat calculation
4. **Select your activity level** and weather conditions
5. **View comprehensive results** including all new health metrics

## Technical Notes

- All calculations use scientifically validated formulas
- Body fat calculation requires all measurements for accuracy
- Water intake recommendations are conservative and safe
- Macronutrient ratios are optimized for active individuals
- The system gracefully handles missing optional data

## Future Enhancements

Potential improvements for future versions:
- BMI category recommendations
- Weight loss/gain calorie targets
- Exercise calorie burn calculator
- Meal planning suggestions
- Progress tracking over time
- Goal setting and achievement tracking 