package edu.kh.farmfarm.alarm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.alarm.model.service.AlarmService;

@Controller
public class AlarmController {
	
	@Autowired
	private AlarmService service;
	
	// 임시 알림창 확인용 페이지 이동 메서드
	@GetMapping("/temp/alarm")
	public String tempAlarm() {
		return "alarm/alarmReceiver";
	}
}
