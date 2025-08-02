-- Migration script to add new columns for advanced health calculator features
-- Run this script if you want to manually add the columns to your database

USE healthDB;

-- Add new columns for advanced health calculations
ALTER TABLE health_records 
ADD COLUMN activity_level VARCHAR(50),
ADD COLUMN waist DOUBLE,
ADD COLUMN neck DOUBLE,
ADD COLUMN hip DOUBLE,
ADD COLUMN weather VARCHAR(20);

-- Add calculated advanced metrics columns
ALTER TABLE health_records 
ADD COLUMN tdee DOUBLE,
ADD COLUMN ideal_body_weight DOUBLE,
ADD COLUMN body_fat_percentage DOUBLE,
ADD COLUMN protein_grams DOUBLE,
ADD COLUMN fat_grams DOUBLE,
ADD COLUMN carbs_grams DOUBLE,
ADD COLUMN water_intake_liters DOUBLE;

-- Add comments to document the new columns
ALTER TABLE health_records 
MODIFY COLUMN activity_level VARCHAR(50) COMMENT 'Activity level: sedentary, lightly_active, moderately_active, very_active, extremely_active',
MODIFY COLUMN waist DOUBLE COMMENT 'Waist circumference in cm for body fat calculation',
MODIFY COLUMN neck DOUBLE COMMENT 'Neck circumference in cm for body fat calculation',
MODIFY COLUMN hip DOUBLE COMMENT 'Hip circumference in cm for body fat calculation (women)',
MODIFY COLUMN weather VARCHAR(20) COMMENT 'Weather condition: hot, moderate, cold for water intake calculation',
MODIFY COLUMN tdee DOUBLE COMMENT 'Total Daily Energy Expenditure in calories',
MODIFY COLUMN ideal_body_weight DOUBLE COMMENT 'Ideal body weight in kg',
MODIFY COLUMN body_fat_percentage DOUBLE COMMENT 'Body fat percentage calculated using U.S. Navy method',
MODIFY COLUMN protein_grams DOUBLE COMMENT 'Recommended protein intake in grams',
MODIFY COLUMN fat_grams DOUBLE COMMENT 'Recommended fat intake in grams',
MODIFY COLUMN carbs_grams DOUBLE COMMENT 'Recommended carbohydrate intake in grams',
MODIFY COLUMN water_intake_liters DOUBLE COMMENT 'Recommended daily water intake in liters';

-- Note: If you're using Hibernate with ddl-auto=update, these columns will be added automatically
-- when you restart the application. This script is provided as a backup option. 