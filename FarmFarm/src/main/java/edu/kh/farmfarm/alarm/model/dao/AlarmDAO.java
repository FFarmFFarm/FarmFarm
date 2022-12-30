package edu.kh.farmfarm.alarm.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.alarm.model.vo.Alarm;

@Repository
public class AlarmDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	/** 알림을 DB에 저장
	 * @return
	 */
	public int insertNewAlarm(Alarm alarm) {
		return sqlSession.insert("alarmMapper.insertNewAlarm", alarm);
	}
	
	
}
