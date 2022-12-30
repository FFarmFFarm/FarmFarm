package edu.kh.farmfarm.alarm.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.alarm.model.dao.AlarmDAO;
import edu.kh.farmfarm.alarm.model.vo.Alarm;

@Service
public class AlarmServiceImpl implements AlarmService {
	
	@Autowired
	private AlarmDAO dao;
	
	
	// 알림을 DB에 저장하는 서비스
	@Override
	public int insertNewAlarm(Alarm alarm) {
		return dao.insertNewAlarm(alarm);
	}
}
