package edu.kh.farmfarm.chat.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.chat.model.vo.Chat;
import edu.kh.farmfarm.chat.model.vo.ChatRoom;

public interface ChatService {

	/** 채팅방 목록 가져오기
	 * @param memberNo
	 * @return
	 */
	List<ChatRoom> getChatRoomList(int myMemberNo);

	
	/** 수신 채팅 읽음처리
	 * @param roomNo
	 * @param myMemberNo
	 * @return
	 */
	int updateChatReadFl(Map<String, Object> updateInfo);
	
	
	/** 채팅 내역 가져오기
	 * @param roomNo
	 * @return
	 */
	List<Chat> getChatHistory(int roomNo);

	
	/** 채팅 보내기
	 * @param chat
	 * @return
	 */
	int insertChat(Chat chat);

	/** 채팅방 참가자 정보를 가져옴
	 * @param roomNo
	 * @return
	 */
	ChatRoom getRoomInfo(int roomNo);


	/** 서버에 사진 저장하기..
	 * @param chatNo
	 * @param chatImg
	 * @param webPath
	 * @param folderPath
	 * @return
	 */
	String insertChatImg(int roomNo, int sendMemberNo, MultipartFile chatImg,  String webPath, String folderPath) throws IllegalStateException, IOException;



}
