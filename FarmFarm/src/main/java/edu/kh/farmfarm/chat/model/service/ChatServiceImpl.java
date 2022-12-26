package edu.kh.farmfarm.chat.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.chat.model.dao.ChatDAO;
import edu.kh.farmfarm.chat.model.vo.Chat;
import edu.kh.farmfarm.chat.model.vo.ChatImg;
import edu.kh.farmfarm.chat.model.vo.ChatRoom;
import edu.kh.farmfarm.common.Util;

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
	
	
	// 채팅 번호 찾기...
//	@Override
//	public int selectChatNo(Chat chat) {
//		return dao.selectChatNo(chat);
//	}

	// 서버에 사진 저장하기..
	@Transactional(rollbackFor = Exception.class)
	@Override
	public String insertChatImg(int roomNo, int sendMemberNo, MultipartFile chatImg, String webPath, String folderPath) throws IllegalStateException, IOException {
		
		// 최종 결과를 담을 변수
		String result = "";
		
		int resultInsertImg = 0;
		
		// 사진 객체
		ChatImg newImg = new ChatImg();
		
		// 사진 리네임
		String rename = Util.fileRename(chatImg.getOriginalFilename());
		
		// 사진 객체 세팅
		newImg.setChatImgOriginal(chatImg.getOriginalFilename());
		newImg.setChatImgRename(rename);
		newImg.setChatImgPath(webPath + rename);
		
		// DB에 내용이 빈 채팅을 만듦
		Chat chat = new Chat();
		
		chat.setSendMemberNo(sendMemberNo);
		chat.setRoomNo(roomNo);
		chat.setChatContent(newImg.getChatImgPath());
		
		// 이미 형식의 채팅 생성
		int resultInsertChat = dao.insertChatImgType(chat);
		
		// 채팅이 만들어졌으면 사진을 db에 저장함
		if(resultInsertChat > 0) {
			
			// chatNo를 찾아옴
			int chatNo = dao.selectChatNo(newImg.getChatImgPath());
			
			// chatNo를 저장
			newImg.setChatNo(chatNo);
			
			// 사진 db에 저장 결과
			resultInsertImg = dao.insertChatImg(newImg);
			
			// 사진이 db에 저장되었으면?
			if(resultInsertImg > 0) {
				// 사진을 경로에 저장
				chatImg.transferTo(new File(folderPath+rename));
				
				result = newImg.getChatImgPath();
				
			} else {
				result = "실패...";
			}
			
		}
		
		return result;
	}
	
}
