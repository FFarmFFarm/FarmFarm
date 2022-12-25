package edu.kh.farmfarm.chat.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.chat.model.vo.Chat;
import edu.kh.farmfarm.chat.model.vo.ChatRoom;

@Repository
public class ChatDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/**
	 * @param memberNo
	 * @return
	 */
	public List<ChatRoom> getChatRoomList(int myMemberNo) {
		return sqlSession.selectList("chatMapper.getChatRoomList", myMemberNo);
	}

	public List<Chat> getChatHistory(int roomNo) {
		return sqlSession.selectList("chatMapper.getChatHistory", roomNo);
	}
}
