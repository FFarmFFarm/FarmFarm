package edu.kh.farmfarm.chat2.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.farmfarm.chat2.model.dao.ChatDAO;
import edu.kh.farmfarm.chat2.model.vo.Chat2;
import edu.kh.farmfarm.chat2.model.vo.Chat2Enter;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatDAO dao;
	
	// 내 채팅방 목록 조회
	@Override
	public List<Chat2Room> selectChatRoomList(int memberNo) {
		return dao.selectChatRoomList(memberNo);
	}

	// 선택한 채팅방의 채팅 목록 조회
	@Override
	public List<Chat2> selectChatList(int roomNo) {
		return dao.selectChatList(roomNo);
	}

	// 새로운 채팅방 개설하기
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertNewRoom(int memberNo, Chat2Room chatRoom) {
		// 1. 채팅방 생성
		// 2. 채팅방 입장
		return 0;
	}

	// 채팅방 참가자 목록 조회
	@Override
	public List<Chat2Enter> selectEnterMemberList(int roomNo) {
		return dao.selectEnterMemberList(roomNo);
	}

	// 채팅 전송
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertNewChat(Chat2 chat) {
		return dao.insertNewChat(chat);
	}

	// 채팅방 정보 수정
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateChatRoom(int roomNo, String roomName) {
		Chat2Room chat2Room = new Chat2Room();
		chat2Room.setRoomNo(roomNo);
		chat2Room.setRoomName(roomName);
		
		return dao.updateChatRoom(chat2Room);
	}

	// 채팅방 입장
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertChatEnter(int roomNo, int memberNo) {
		Chat2Enter chat2Enter = new Chat2Enter();
		chat2Enter.setRoomNo(roomNo);
		chat2Enter.setMemberNo(memberNo);
		
		return dao.insertChatEnter(chat2Enter);
	}

	// 채팅방 탈퇴
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateChatEnter(int roomNo, int memberNo) {
		Chat2Enter chat2Enter = new Chat2Enter();
		chat2Enter.setRoomNo(roomNo);
		chat2Enter.setMemberNo(memberNo);
		
		return dao.updateChatEnter(chat2Enter);
	}
	
}
