package edu.kh.farmfarm.chat2.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.chat2.model.dao.Chat2DAO;
import edu.kh.farmfarm.chat2.model.vo.Chat2;
import edu.kh.farmfarm.chat2.model.vo.Chat2Enter;
import edu.kh.farmfarm.chat2.model.vo.Chat2Img;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;
import edu.kh.farmfarm.common.Util;

@Service
public class Chat2ServiceImpl implements Chat2Service {

	@Autowired
	private Chat2DAO dao;
	
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
	public int insertNewChat2Room(int memberNo, Chat2Room chatRoom) {
		// 1. 채팅방 생성
		// 2. 채팅방 입장
		return 0;
	}

	// 채팅방 참가자 목록 조회
	@Override
	public List<Integer> selectEnterMemberList(int roomNo) {
		return dao.selectEnterMemberList(roomNo);
	}

	// 채팅 전송
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertNewChat(Chat2 chat) {
		return dao.insertNewChat(chat);
	}
	
	// 사진 전송
	@Transactional(rollbackFor = Exception.class)
	@Override
	public String insertNewChatImg(int roomNo, int memberNo, MultipartFile chatImg, String webPath, String folderPath) throws IllegalStateException, IOException {
		
		// 최종 결과를 담을 변수
		String newChatImgPath = null;
		
		// 사진 객체
		Chat2Img newChatImg = new Chat2Img();
		
		// 사진 이름 변경
		String rename = Util.fileRename(chatImg.getOriginalFilename());
		
		// 사진 객체 세팅
		newChatImg.setChatImgOriginal(chatImg.getOriginalFilename());
		newChatImg.setChatImgRename(rename);
		newChatImg.setChatImgPath(webPath + rename);
		
		// 먼저 채팅을 DB에 저장함(어쩔 수 없음..)
		Chat2 chat = new Chat2();
		
		chat.setRoomNo(roomNo);
		chat.setMemberNo(memberNo);
		chat.setChatType("I");
		chat.setChatContent(newChatImg.getChatImgPath());
		
		int resultInsertNewChat = dao.insertNewChat(chat);
		
		// 채팅 내용을 DB에 잘 저장했으면 사진을 저장함
		if(resultInsertNewChat > 0) {
			
			// chatNo를 newChatImg에 세팅
			int chatNo = chat.getChatNo();
			newChatImg.setChatNo(chatNo);
			
			// 사진을 DB에 저장함
			int resultInsertNewImg = dao.insertNewChatImg(newChatImg);
			
			// 사진도 잘 저장되었으면?
			if(resultInsertNewImg > 0) {
				// 사진을 디렉토리에 저장
				chatImg.transferTo(new File(folderPath+rename));
				
				newChatImgPath = newChatImg.getChatImgPath();
			}
		}
		
		// 만약 중간에 오류가 발생하면, null값이 반환됨!
		return newChatImgPath;
	}

	// 채팅방 정보 수정
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateChat2Room(int roomNo, String roomName) {
		Chat2Room chat2Room = new Chat2Room();
		chat2Room.setRoomNo(roomNo);
		chat2Room.setRoomName(roomName);
		
		return dao.updateChat2Room(chat2Room);
	}

	// 채팅방 입장
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertChat2Enter(int roomNo, int memberNo) {
		Chat2Enter chat2Enter = new Chat2Enter();
		chat2Enter.setRoomNo(roomNo);
		chat2Enter.setMemberNo(memberNo);
		
		return dao.insertChat2Enter(chat2Enter);
	}

	// 채팅방 탈퇴
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateChat2Enter(int roomNo, int memberNo) {
		Chat2Enter chat2Enter = new Chat2Enter();
		chat2Enter.setRoomNo(roomNo);
		chat2Enter.setMemberNo(memberNo);
		
		return dao.updateChat2Enter(chat2Enter);
	}


	
}
