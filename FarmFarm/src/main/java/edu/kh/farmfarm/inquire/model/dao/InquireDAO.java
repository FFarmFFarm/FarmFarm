package edu.kh.farmfarm.inquire.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;

@Repository
public class InquireDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 상담 방 존재 유무 확인
	 * @param map
	 * @return
	 */
	public int checkInquireRoom(Map<String, Integer> map) {
		return sqlSession.selectOne("inquireMapper.checkInquireRoom", map);
	}

	/** 상담 방 생성
	 * @param map
	 * @return
	 */
	public int createInquireRoom(Map<String, Integer> map) {
		int result = sqlSession.insert("inquireMapper.createInquireRoom", map);
		
		if(result > 0) result = map.get("inquireNo");
		
		return result;
	}

	/** 상담방 생성 시 안내 메세지 삽입
	 * @param map
	 */
	public void insertFirstMessage(Map<String, Integer> map) {
		sqlSession.insert("inquireMapper.insertFirstMessage", map);
	}
	
	/** 상담 방 상세조회
	 * @param inquireNo
	 * @return
	 */
	public List<Message> selectInquire(int inquireNo) {
		return sqlSession.selectList("inquireMapper.selectInquire", inquireNo);
	}

	/** 상담방 메세지 읽음 처리
	 * @param inquireNo
	 */
	public void messageRead(int inquireNo) {
		sqlSession.update("inquireMapper.messageRead", inquireNo);
	}

	public int unreadCheck(int memberNo) {
		return sqlSession.selectOne("inquireMapper.unreadCheck", memberNo);
	}

	
	

}
