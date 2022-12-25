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

	/** 채팅방 목록 가져오기
	 * @param memberNo
	 * @return
	 */
	public List<ChatRoom> getChatRoomList(int myMemberNo) {
		return sqlSession.selectList("chatMapper.getChatRoomList", myMemberNo);
	}

	/** 채팅 내역 가져오기
	 * @param roomNo
	 * @return
	 */
	public List<Chat> getChatHistory(int roomNo) {
		return sqlSession.selectList("chatMapper.getChatHistory", roomNo);
	}

	/** 채팅 보내기
	 * @param chat
	 * @return
	 */
	public int insertChat(Chat chat) {
		return sqlSession.insert("chatMapper.insertChat", chat);
	}

	/** 채팅방 정보 가져오기
	 * @param roomNo
	 * @return 참가중인 회원의 번호
	 */
	public ChatRoom getRoomInfo(int roomNo) {
		return sqlSession.selectOne("chatMapper.getRoomInfo", roomNo);
	}
}
