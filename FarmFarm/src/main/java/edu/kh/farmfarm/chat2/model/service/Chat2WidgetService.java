package edu.kh.farmfarm.chat2.model.service;

import java.util.List;

import edu.kh.farmfarm.chat2.model.vo.Chat2Room;

public interface Chat2WidgetService {

	/** 내 채팅방 목록 조회(SELECT, LIMIT 6)
	 * @param memberNo
	 * @return List<Chat2Room>
	 */
	List<Chat2Room> selectChatWidgetList(int memberNo);
}
