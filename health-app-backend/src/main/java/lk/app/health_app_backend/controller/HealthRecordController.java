package lk.app.health_app_backend.controller;

import lk.app.health_app_backend.dto.request.HealthRecordCreateRequest;
import lk.app.health_app_backend.dto.response.GetHealthRecordResponse;
import lk.app.health_app_backend.model.User;
import lk.app.health_app_backend.repository.UserRepository;
import lk.app.health_app_backend.service.HealthRecordService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/health-records")
public class HealthRecordController {
    private final HealthRecordService healthRecordService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<GetHealthRecordResponse> createHealthRecord(@RequestBody HealthRecordCreateRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        GetHealthRecordResponse response = healthRecordService.createHealthRecord(request, user);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<GetHealthRecordResponse>> getUserHealthRecords(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        List<GetHealthRecordResponse> records = user.getHealthRecords().stream()
            .map(hr -> new GetHealthRecordResponse(
                hr.getId(),
                user.getId(),
                hr.getAge(),
                hr.getGender(),
                hr.getHeight(),
                hr.getWeight(),
                hr.getBmi(),
                hr.getBmr(),
                hr.getCalorieNeeds(),
                hr.getDate(),
                hr.getTdee(),
                hr.getIdealBodyWeight(),
                hr.getBodyFatPercentage(),
                hr.getProteinGrams(),
                hr.getFatGrams(),
                hr.getCarbsGrams(),
                hr.getWaterIntakeLiters(),
                hr.getActivityLevel(),
                hr.getWaist(),
                hr.getNeck(),
                hr.getHip(),
                hr.getWeather()
            )).collect(Collectors.toList());
        return ResponseEntity.ok(records);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetHealthRecordResponse> getHealthRecord(@PathVariable Long id) {
        GetHealthRecordResponse response = healthRecordService.getHealthRecord(id);
        return ResponseEntity.ok(response);
    }
}
