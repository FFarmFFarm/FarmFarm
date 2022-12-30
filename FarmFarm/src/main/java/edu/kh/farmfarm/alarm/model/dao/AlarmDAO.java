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


	/** 게시글의 작성자 번호를 찾는 서비스
	 * @param targetNo
	 * @return
	 */
	public int selectBoardWriterNo(int boardNo) {
		return sqlSession.selectOne("boardMapper.selectBoardWriterNo", boardNo);
	}
	
	/** 댓글의 작성자 번호를 찾는 서비스
	 * @param targetNo
	 * @return
	 */
	public int selectCommentWriterNo(int commentNo) {
		return sqlSession.selectOne("boardMapper.selectCommentWriterNo", commentNo);
	}
	
	
}
