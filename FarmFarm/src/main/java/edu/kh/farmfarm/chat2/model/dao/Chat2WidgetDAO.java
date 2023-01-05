package edu.kh.farmfarm.chat2.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.chat.model.vo.ChatRoom;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;

@Repository
public class Chat2WidgetDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;


	/** 내 채팅방 목록 조회(SELECT, LIMIT 6)
	 * @param memberNo
	 * @return List<Chat2Room>
	 */
	public List<Chat2Room> selectChatWidgetList(int memberNo) {
		return sqlSession.selectList("chat2Mapper.selectChatWidgetList", memberNo);
	}


}
