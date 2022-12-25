package edu.kh.farmfarm.chat.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.chat.model.dao.ChatDAO;
import edu.kh.farmfarm.chat.model.vo.Chat;
import edu.kh.farmfarm.chat.model.vo.ChatRoom;

@Service
public class ChatServiceImpl implements ChatService {
	
	@Autowired
	private ChatDAO dao;
	
	// 채팅방 목록 가져오기
	@Override
	public List<ChatRoom> getChatRoomList(int myMemberNo) {
		return dao.getChatRoomList(myMemberNo);
	}

	// 채팅 내역 가져오기
	@Override
	public List<Chat> getChatHistory(int roomNo) {
		return dao.getChatHistory(roomNo);
	}
}
