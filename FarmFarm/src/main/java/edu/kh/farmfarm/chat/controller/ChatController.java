package edu.kh.farmfarm.chat.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.google.gson.Gson;

import edu.kh.farmfarm.chat.model.service.ChatService;
import edu.kh.farmfarm.chat.model.vo.Chat;
import edu.kh.farmfarm.chat.model.vo.ChatRoom;
import edu.kh.farmfarm.member.model.VO.Member;

@Controller
@SessionAttributes("loginMember")
public class ChatController {
	
	@Autowired
	private ChatService service;
	
	// 채팅 페이지로 이동
	@GetMapping("/chat")
	public String goChatPage() {
		return "chat/myChat";
	}
	
	// 내 채팅방 목록 가져오기
	@PostMapping("/chat/chatRoomList")
	@ResponseBody
	public String getChatRoomList(
			HttpSession session
//			@RequestParam(value = "memberNo", required = true) int memberNo
			){
		
		// 1. 세션에서 로그인 중인 회원의 정보가 담긴 객체를 가져옴
		Member loginMember = (Member)session.getAttribute("loginMember");
		
		// 2. 회원 정보 객체에서 회원 번호를 꺼냄
		int myMemberNo = loginMember.getMemberNo();
		String myMemberNickname = loginMember.getMemberNickname();
		
		// 3. 회원 번호를 보내, 회원이 참가중인 모든 채팅방을 가져옴
		List<ChatRoom> chatRoomList = service.getChatRoomList(myMemberNo);
		
		// 4. 회원 정보를 재배치 : 내 이름, 내 정보는 MEMBER_NO, MEMBER_NICKNAME으로,
		//                    상대 이름, 상대 정보는 MEMBER_NO2, MEMBER_NICKNAME2로 세팅
		for(ChatRoom chatRoom : chatRoomList) {
			if(chatRoom.getMemberNo2() == myMemberNo ) {
				int tempNo = chatRoom.getMemberNo();
				chatRoom.setMemberNo(myMemberNo);
				chatRoom.setMemberNo2(tempNo);
			}
			if(chatRoom.getMemberNickname2().equals(myMemberNickname)) {
				String tempNickname = chatRoom.getMemberNickname();
				chatRoom.setMemberNickname(myMemberNickname);
				chatRoom.setMemberNickname2(tempNickname);
			}
		}
		
		// 5. map에 ChatRoom의 정보를 담음
		Map<String, Object> chatRoomMap = new HashMap<String, Object>();
		
		chatRoomMap.put("chatRoomList", chatRoomList);
		
		// 6. Gson을 이용해 반환
		return new Gson().toJson(chatRoomMap);
	}
	
	// 해당 채팅방의 채팅내역 가져오기
	@PostMapping("/chat/{roomNo}")
	@ResponseBody
	public String getChatHistory(
			HttpSession session,
			@PathVariable(value = "roomNo") int roomNo
			){
		// 1. 세션에서 로그인 중인 회원의 정보가 담긴 객체를 가져옴
		Member loginMember = (Member)session.getAttribute("loginMember");
		
		// 2. 회원 정보 객체에서 회원 번호를 꺼냄
		int myMemberNo = loginMember.getMemberNo();
		
		// 3. roomNo를 보내 채팅 목록을 가져옴
		List<Chat> chatHistory = service.getChatHistory(roomNo);
		
		// 4. 내 회원 번호, 채팅 목록을 Map에 담음
		Map<String, Object> chatHistoryMap = new HashMap<String, Object>();
		
		chatHistoryMap.put("myMemberNo", myMemberNo);
		chatHistoryMap.put("chatHistory", chatHistory);
		
		// 3. 반환
		return new Gson().toJson(chatHistoryMap);
	}
}
