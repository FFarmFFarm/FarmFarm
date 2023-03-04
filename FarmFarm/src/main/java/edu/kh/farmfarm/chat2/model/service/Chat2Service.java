package edu.kh.farmfarm.chat2.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.chat2.model.vo.Chat2;
import edu.kh.farmfarm.chat2.model.vo.Chat2Enter;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;
import edu.kh.farmfarm.chat2.model.vo.Emoticon;

public interface Chat2Service {

	/** 내 채팅방 목록 조회
	 * @param memberNo
	 * @return List<Chat2Room>
	 */
	List<Chat2Room> selectChatRoomList(int memberNo);
	
	/** 선택한 채팅방의 채팅 정보 조회
	 * @param roomNo
	 * @return
	 */
	Chat2Room selectChatRoom(int roomNo);

	/** 선택한 채팅방의 채팅 목록 조회
	 * @param roomNo
	 * @return List<Chat2>
	 */
	List<Chat2> selectChatList(int roomNo, int memberNo);

	/** 새로운 채팅방 개설하기
	 * @param memberNo
	 * @return roomNo(empty, then -1)
	 */
	int insertNewChatRoom(int memberNo, int sellerNo, Chat2Room chatRoom);
	
	/** 채팅방 참가자 목록 조회
	 * @param roomNo
	 * @return
	 */
	public List<Integer> selectEnterMemberList(int roomNo);
	

	/** 선택한 채팅방의 참가자 정보 조회
	 * @param roomNo
	 * @return
	 */
	List<Chat2Room> selectChatRoomMemberList(int roomNo);
	
	/** 채팅 전송
	 * @param chat
	 * @return
	 */
	public int insertNewChat(Chat2 chat);
	
	/** 사진형식 채팅 전송
	 * @param roomNo
	 * @param memberNo
	 * @param chatImg
	 * @param webPath
	 * @param folderPath
	 * @return
	 */
	List<Object> insertNewChatImg(int roomNo, int memberNo, MultipartFile chatImg, String webPath, String folderPath) throws IllegalStateException, IOException;

	/** 채팅 삭제처리
	 * @param chatNo
	 * @param chatType
	 * @return
	 */
	int deleteChat(int memberNo, int chatNo);
	
	/** 채팅방 정보 수정
	 * @param roomNo
	 * @param roomName
	 * @return
	 */
	int updateChatRoom(int roomNo, String roomName);

	/** 채팅방 입장
	 * @param roomNo
	 * @param memberNo
	 * @return
	 */
	int insertChatEnter(int roomNo, int memberNo);
	
	
	/** 채팅방 초대
	 * @param roomNo
	 * @param memberNickname
	 * @return
	 */
	int updateChatEnterInvite(int roomNo, String memberNickname);
	
	
	/** 채팅방 초대 승인/거부
	 * @param roomNo
	 * @param memberNo
	 * @return
	 */
	int updateChatEnterApprove(int enterNo, String enterStatus);

	/** 채팅방 탈퇴
	 * @param roomNo
	 * @param memberNo
	 * @return
	 */
	int deleteChatEnter(int roomNo, int memberNo);


	/** 입장 시 시스템 메세지
	 * @param roomNo
	 * @param chatContent
	 * @return
	 */
//	int insertNewSystemChat(int roomNo, String chatContent);

	
	

	/** 2. 입장 시 조회 처리 : UNREAD_CHAT_COUNT 0으로 만들기
	 * @param memberNo
	 * @param roomNo
	 * @return
	 */
	int updateUnreadCount(int memberNo, int roomNo);

	
	/** 1. 입장 시 조회 처리 : n명 읽음 + 1;
	 * @param memberNo
	 * @param roomNo
	 * @return
	 */
	int updateReadCount(int memberNo, int roomNo) ;

	
	/** 이모티콘 카테고리 목록 가져오기
	 * @return
	 */
	List<Emoticon> selectEmoticonCategoryList();

	/** 이모티콘 리스트 가져오기
	 * @param emoticonCategoryNo
	 * @return
	 */
	List<Emoticon> selectEmoticonList(int emoticonCategoryNo);











}
