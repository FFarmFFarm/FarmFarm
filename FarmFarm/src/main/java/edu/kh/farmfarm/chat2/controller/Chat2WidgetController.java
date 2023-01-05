package edu.kh.farmfarm.chat2.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;

import edu.kh.farmfarm.chat2.model.service.Chat2WidgetService;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;

// 채팅 위젯용 컨트롤러입니다...
@Controller
@RequestMapping("/chat")
@SessionAttributes({"loginMember", "shortcutNo"})
public class Chat2WidgetController {
	
	@Autowired
	private Chat2WidgetService service;
	
	
	// 내 채팅방 목록 조회(SELECT, LIMIT 6)
	@PostMapping("/select/widget")
	@ResponseBody
	public String selectChatWidgetList(int memberNo) {
		
		// 회원 정보를 이용해서, 내 채팅방 목록 및 데이터를 조회함
		List<Chat2Room> chatRoomList = service.selectChatWidgetList(memberNo);
		
		// map에 담아서 반환
		Map<String, Object> chatRoomMap = new HashMap<String, Object>();
		
		chatRoomMap.put("chatRoomList", chatRoomList);
		
		return new Gson().toJson(chatRoomMap);
	}	
	
	// 선택한 방으로 이동
	@PostMapping("/shortcut")
	private String goSelectedRoom(int roomNo, Model model, RedirectAttributes ra) {
		
		ra.addFlashAttribute("shortcutNo", roomNo);
		
		return "redirect:/chat";
	}
}
