package edu.kh.farmfarm.chat.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	// 채팅 보내기
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertChat(Chat chat) {
		return dao.insertChat(chat);
	}

	// 채팅방 참가자 정보를 가져옴
	@Override
	public ChatRoom getRoomInfo(int roomNo) {
		return dao.getRoomInfo(roomNo);
	}
}
