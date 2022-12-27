package edu.kh.farmfarm.chat.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.chat.model.vo.ChatRoom;

@Repository
public class ChatWidgetDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;


	/** 채팅방 목록 가져오기
	 * @param memberNo
	 * @return
	 */
	public List<ChatRoom> getMyChatWidget(int myMemberNo) {
		return sqlSession.selectList("chatWidgetMapper.getMyChatWidget", myMemberNo);
	}


}
