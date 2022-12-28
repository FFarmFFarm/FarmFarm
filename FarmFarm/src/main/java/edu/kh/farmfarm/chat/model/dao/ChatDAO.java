package edu.kh.farmfarm.chat.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.chat.model.vo.Chat;
import edu.kh.farmfarm.chat.model.vo.ChatImg;
import edu.kh.farmfarm.chat.model.vo.ChatRoom;
import edu.kh.farmfarm.member.model.VO.Member;

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
	
	/** 채팅 내역 가져오기 전, 읽음 처리
	 * @param roomNo
	 * @param myMemberNo
	 * @return
	 */
	public int updateChatReadFl(Map<String, Object> updateInfo) {
		return sqlSession.update("chatMapper.updateChatReadFl", updateInfo);
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
	
	/** 채팅 보내기
	 * @param chat
	 * @return
	 */
	public int insertChatImgType(Chat chat) {
		return sqlSession.insert("chatMapper.insertChat_imgType", chat);
	}

	/** 채팅방 정보 가져오기
	 * @param roomNo
	 * @return 참가중인 회원의 번호
	 */
	public ChatRoom selectRoomInfo(int roomNo) {
		return sqlSession.selectOne("chatMapper.selectPostNoOfRoom", roomNo);
	}

	/** 채팅 번호 찾기...
	 * @param roomNo
	 * @param senderNo
	 * @param chatContent
	 * @return
	 */
	public int selectChatNo(String chatImgPath) {
		return sqlSession.selectOne("chatMapper.selectChatNo", chatImgPath);	
	}

	/** 채팅 이미지 전달
	 * @param newImg
	 * @return
	 */
	public int insertChatImg(ChatImg newImg) {
		return sqlSession.insert("chatMapper.insertChatImgDb", newImg);
	}


	/** 상대방 번호를 가져옴
	 * @param roomNo
	 * @return
	 */
	public ChatRoom selectParticipantNo(int roomNo) {
		return sqlSession.selectOne("chatMapper.selectParticipantNo", roomNo);
	}

	/** 상대방의 닉네임, 이미지를 가져옴
	 * @param partnerNo
	 * @return
	 */
	public Member selectPartnerInfo(int memberNo) {
		return sqlSession.selectOne("memberMapper.selectPartnerInfo", memberNo);
	}

	/** 판매자의 번호를 가져옴
	 * @param postNo
	 * @return
	 */
	public int selectSellerNo(int postNo) {
		return sqlSession.selectOne("postDetailMapper.selectSellerNo", postNo);
	}

	/** 채팅방 개설 전, 동일한 채팅방이 있는지 검색
	 * @param chatRoom
	 * @return
	 */
	public int selectRoomNo(ChatRoom chatRoom) {
		return sqlSession.selectOne("chatMapper.selectRoomNo", chatRoom);
	}

	/** 방 생성 후, 해당 방의 번호를 가져옴
	 * @param chatRoom
	 * @return
	 */
	public int insertNewRoom(ChatRoom chatRoom) {
		return sqlSession.insert("chatMapper.insertNewRoom", chatRoom);
	}


}
