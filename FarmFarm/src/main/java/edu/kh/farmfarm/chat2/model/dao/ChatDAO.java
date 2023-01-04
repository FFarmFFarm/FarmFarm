package edu.kh.farmfarm.chat2.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.chat2.model.vo.Chat2;
import edu.kh.farmfarm.chat2.model.vo.Chat2Enter;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;

@Repository
public class ChatDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	/** 내 채팅방 목록 조회
	 * @param memberNo
	 * @return List<Chat2Room>
	 */
	public List<Chat2Room> selectChatRoomList(int memberNo) {
		return sqlSession.selectList("chat2Mapper.selectChatRoomList", memberNo);
	}

	/** 선택한 채팅방의 채팅 목록 조회
	 * @param roomNo
	 * @return
	 */
	public List<Chat2> selectChatList(int roomNo) {
		return sqlSession.selectList("chat2Mapper.selectChatList", roomNo);
	}
	
	// 새 채팅방 개설
	
	/** 채팅방 참가자 조회(SELECT)
	 * @param roomNo
	 * @return List<Chat2Enter> enterMemberList
	 */
	public List<Chat2Enter> selectEnterMemberList(int roomNo) {
		
		// 방 번호를 전달해서, 회원 목록을 조회
		List<Chat2Enter> enterMemberList = sqlSession.selectList("chat2Mapper.selectEnterMemberList", roomNo);
		
		// 반환
		return enterMemberList;
	}
	
	/** 채팅 전송(INSERT) : 언제 실행되나요? 웹소켓에 채팅을 보냈을 때
	 * @param chat
	 * @return result
	 */
	public int insertNewChat(Chat2 chat) {
		// 방 번호, 회원 번호, 채팅 유형, 채팅 내용을 전달받아서, DB에 저장
		return sqlSession.insert("chat2Mapper.insertNewChat", chat);
	}
	
	/** 채팅방 정보 수정
	 * @param roomNo
	 * @return result
	 */
	public int updateChatRoom(Chat2Room chat2Room) {
		return sqlSession.update("chat2Mapper.updateChatRoom", chat2Room);
	}

	/** 채팅방 입장
	 * @param chat2Enter
	 * @return result
	 */
	public int insertChatEnter(Chat2Enter chat2Enter) {
		return sqlSession.insert("chat2Mapper.insertChatEnter", chat2Enter);
	}

	/** 채팅방 탈퇴
	 * @param chat2Enter
	 * @return result
	 */
	public int updateChatEnter(Chat2Enter chat2Enter) {
		return sqlSession.update("chat2Mapper.updateChatEnter", chat2Enter);
	}
	
	
	
	// ------------------------------------------------------------------ //
	

	
	// 채팅방 삭제(UPDATE)
	// 언제 실행되나요? 채팅방 참가자가 나갔을 때, 해당 채팅방에 참가자가 더 없는 경우 수행됨
	public int updateChatRoomStatus(int roomNo) {
		// 방 번호를 전달 받아서, 해당 방을 수정함
		return sqlSession.update("chat2Mapper.updateChatRoomStatus", roomNo);
	}
	



}
