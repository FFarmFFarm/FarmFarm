package edu.kh.farmfarm.chat2.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.chat2.model.vo.Chat2;
import edu.kh.farmfarm.chat2.model.vo.Chat2Enter;
import edu.kh.farmfarm.chat2.model.vo.Chat2Img;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;
import edu.kh.farmfarm.member.model.VO.Member;

@Repository
public class Chat2DAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	/** 내 채팅방 목록 조회
	 * @param memberNo
	 * @return List<Chat2Room>
	 */
	public List<Chat2Room> selectChatRoomList(int memberNo) {
		return sqlSession.selectList("chat2Mapper.selectChatRoomList", memberNo);
	}
	
	/** 선택한 채팅방의 정보 조회
	 * @param roomNo
	 * @return
	 */
	public Chat2Room selectChatRoom(int roomNo) {
		return sqlSession.selectOne("chat2Mapper.selectChatRoom", roomNo);
	}

	/** 선택한 채팅방의 채팅 목록 조회
	 * @param roomNo
	 * @return
	 */
	public List<Chat2> selectChatList(int roomNo) {
		return sqlSession.selectList("chat2Mapper.selectChatList", roomNo);
	}
	
	/** 채팅방 개설
	 * @param chatRoom
	 * @return
	 */
	public int insertNewChatRoom(Chat2Room chatRoom) {
		return sqlSession.insert("chat2Mapper.insertNewChatRoom", chatRoom);
	}
	
	/** 채팅방 개설 전, 방이 존재하는지 점검
	 * @param chatRoom
	 * @return
	 */
	public int selectChatRoomExist(Chat2Room chatRoom) {
		return sqlSession.selectOne("chat2Mapper.selectChatRoomExist", chatRoom);
	}
	
	
	/** 채팅방 참가자 조회(SELECT)
	 * @param roomNo
	 * @return List<Chat2Enter> enterMemberList
	 */
	public List<Integer> selectEnterMemberList(int roomNo) {
		
		// 방 번호를 전달해서, 회원 목록을 조회
		List<Integer> enterMemberList = sqlSession.selectList("chat2Mapper.selectEnterMemberList", roomNo);
		
		// 반환
		return enterMemberList;
	}
	
	/** 채팅방 참가자 정보 조회(SELECT)
	 * @param roomNo
	 * @return
	 */
	public List<Chat2Room> selectChatRoomMemberList(int roomNo) {
		return sqlSession.selectList("chat2Mapper.selectChatRoomMemberList", roomNo);
	}

	
	/** 채팅 전송(INSERT) : 언제 실행되나요? 웹소켓에 채팅을 보냈을 때
	 * @param chat
	 * @return result
	 */
	public int insertNewChat(Chat2 chat) {
		// 방 번호, 회원 번호, 채팅 유형, 채팅 내용을 전달받아서, DB에 저장
		return sqlSession.insert("chat2Mapper.insertNewChat", chat);
	}
	
	/** 사진 형식 채팅 전송(INSERT) : 언제 실행되나요? 웹소켓에 채팅을 보냈을 때
	 * @param newChatImg
	 * @return
	 */
	public int insertNewChatImg(Chat2Img newChatImg) {
		return sqlSession.insert("chat2Mapper.insertNewChatImg", newChatImg);
	}
	
	/** 채팅방 정보 수정
	 * @param roomNo
	 * @return result
	 */
	public int updateChat2Room(Chat2Room chat2Room) {
		return sqlSession.update("chat2Mapper.updateChatRoom", chat2Room);
	}

	/** 채팅방 입장
	 * @param chatEnter
	 * @return result
	 */
	public int insertChatEnter(Chat2Enter chatEnter) {
		return sqlSession.insert("chat2Mapper.insertChatEnter", chatEnter);
	}
	
	
	/** 채팅방 입장 보조...
	 * @param postNo
	 * @return
	 */
	public int selectSellerNo(int postNo) {
		return sqlSession.selectOne("postDetailMapper.selectSellerNo", postNo);
	}
	
	/** 채팅방 초대 보조... 회원 닉네임 확인
	 * @param memberNickname
	 * @return
	 */
	public Member selectEnterMemberInfo(String memberNickname) {
		return sqlSession.selectOne("memberMapper.selectEnterMemberInfo", memberNickname);
	}
	
	/** 채팅방 초대 보조... 중복 초대 확인
	 * @param chatEnter
	 * @return
	 */
	public String selectDuplicateInvite(Chat2Enter chatEnter) {
		return sqlSession.selectOne("chat2Mapper.selectDuplicatInvite", chatEnter);
	}

	
	/** 채팅방 초대 승인 / 거부
	 * @param chatEnter
	 * @return
	 */
	public int updateChatEnterApprove(Chat2Enter chatEnter) {
		return sqlSession.update("chat2Mapper.updateChatEnterApprove", chatEnter);
	}
	
	

	/** 채팅방 탈퇴
	 * @param chat2Enter
	 * @return result
	 */
	public int deleteChatEnter(Chat2Enter chat2Enter) {
		return sqlSession.update("chat2Mapper.deleteChatEnter", chat2Enter);
	}
	
	
	
	// ------------------------------------------------------------------ //
	

	
	// 채팅방 삭제(UPDATE)
	// 언제 실행되나요? 채팅방 참가자가 나갔을 때, 해당 채팅방에 참가자가 더 없는 경우 수행됨
	public int updateChatRoomStatus(int roomNo) {
		// 방 번호를 전달 받아서, 해당 방을 수정함
		return sqlSession.update("chat2Mapper.updateChatRoomStatus", roomNo);
	}












	



}
