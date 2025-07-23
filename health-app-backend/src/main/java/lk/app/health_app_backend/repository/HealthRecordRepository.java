package lk.app.health_app_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.app.health_app_backend.model.HealthRecord;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {
}
