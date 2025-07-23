package lk.app.health_app_backend.service;

import lk.app.health_app_backend.dto.request.HealthRecordCreateRequest;
import lk.app.health_app_backend.dto.response.GetHealthRecordResponse;
import lk.app.health_app_backend.model.User;

public interface HealthRecordService {
    GetHealthRecordResponse createHealthRecord(HealthRecordCreateRequest healthRecordCreateRequest, User user);
    GetHealthRecordResponse getHealthRecord(Long id);
}
