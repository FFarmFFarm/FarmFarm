package edu.kh.farmfarm.chat.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;

import edu.kh.farmfarm.chat.model.service.ChatWidgetService;
import edu.kh.farmfarm.chat.model.vo.ChatRoom;
import edu.kh.farmfarm.member.model.VO.Member;

// 채팅 위젯용 컨트롤러입니다...
// with ChatListenHandler
@Controller
@SessionAttributes({"loginMember", "shortcutNo"})
public class ChatWidgetController {
	
	@Autowired
	private ChatWidgetService service;
	
	
	// 내 회원 정보를 가져옴..
	@PostMapping("/get/myNo")
	@ResponseBody
	private String getMyNo(HttpSession session) {
		// 1. 세션에서 로그인 중인 회원의 정보가 담긴 객체를 가져옴
		
		int myMemberNo = -1;
		
		if(session.getAttribute("loginMember") != null) {
			Member loginMember = (Member)session.getAttribute("loginMember");
			myMemberNo = loginMember.getMemberNo();
		}
		
		return new Gson().toJson(myMemberNo);
	}
	
	// 채팅 위젯을 채울 정보 가져오기
	@PostMapping("/chat/widget")
	@ResponseBody
	private String getMyChatWidget(
			HttpSession session
			) {
		
		int myMemberNo = -1;
		String myMemberNickname = "";
		
		// 1. 세션에서 로그인 중인 회원의 정보가 담긴 객체를 가져옴(단, 세션에 값이 있을 때에만)
		if(session.getAttribute("loginMember") != null) {
			Member loginMember = (Member)session.getAttribute("loginMember");

			// 2. 회원 정보 객체에서 회원 번호를 꺼냄
			myMemberNo = loginMember.getMemberNo();
			myMemberNickname = loginMember.getMemberNickname();
			
			// 3. 회원 번호를 보내, 회원이 참가중인 모든 채팅방을 가져옴
			List<ChatRoom> chatRoomList = service.getMyChatWidget(myMemberNo);
			
			// 4. 회원 정보를 재배치 : 내 이름, 내 정보는 MEMBER_NO, MEMBER_NICKNAME으로,
			//                    상대 이름, 상대 정보는 MEMBER_NO2, MEMBER_NICKNAME2로 세팅
			//                    동시에 읽지 않은 총 개수를 가져옴
			int unReadCountAll = 0;
			
			for(ChatRoom chatRoom : chatRoomList) {
				if(chatRoom.getMemberNo2() == myMemberNo ) {
					int tempNo = chatRoom.getMemberNo();
					chatRoom.setMemberNo(myMemberNo);
					chatRoom.setMemberNo2(tempNo);
					
					String tempNickname = chatRoom.getMemberNickname();
					chatRoom.setMemberNickname(myMemberNickname);
					chatRoom.setMemberNickname2(tempNickname);	
					
					String tempProfileImg = chatRoom.getProfileImg();
					chatRoom.setProfileImg(chatRoom.getProfileImg2());
					chatRoom.setProfileImg2(tempProfileImg);
				}
				unReadCountAll += chatRoom.getUnreadChatCount();
			}
			
			// 5. map에 ChatRoom의 정보를 담음
			Map<String, Object> chatWidgetMap = new HashMap<String, Object>();
			
			// 6. 읽지 않은 개수를 전부 합쳐서 가져옴
			chatWidgetMap.put("chatRoomList", chatRoomList);
			chatWidgetMap.put("unReadCountAll", unReadCountAll);
			
			// 7. Gson을 이용해 반환
			return new Gson().toJson(chatWidgetMap);
			
		} else {
			
			return new Gson().toJson("need logined");
		
		}
		
		
	}
	
	
	// 선택한 방으로 이동
	@PostMapping("/chat/shortcut")
	private String goSelectedRoom(int roomNo, Model model, RedirectAttributes ra) {
		
		ra.addFlashAttribute("shortcutNo", roomNo);
		
		return "redirect:/chat";
	}
}
