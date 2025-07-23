package lk.app.health_app_backend.exception;

public class HealthRecordNotFoundException extends RuntimeException {
    public HealthRecordNotFoundException(String message) {
        super(message);
    }
}
