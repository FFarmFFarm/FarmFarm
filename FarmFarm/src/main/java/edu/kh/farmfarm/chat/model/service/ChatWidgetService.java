package edu.kh.farmfarm.chat.model.service;

import java.util.List;

import edu.kh.farmfarm.chat.model.vo.ChatRoom;

public interface ChatWidgetService {

	/** 채팅방 목록 가져오기
	 * @param memberNo
	 * @return
	 */
	List<ChatRoom> getMyChatWidget(int myMemberNo);
}
