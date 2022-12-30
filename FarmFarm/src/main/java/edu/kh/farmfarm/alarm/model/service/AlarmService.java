package edu.kh.farmfarm.alarm.model.service;

import edu.kh.farmfarm.alarm.model.vo.Alarm;

public interface AlarmService {

	
	/** 알림을 DB에 저장하는 서비스
	 * @param alarm
	 * @return
	 */
	int insertNewAlarm(Alarm alarm);

}
