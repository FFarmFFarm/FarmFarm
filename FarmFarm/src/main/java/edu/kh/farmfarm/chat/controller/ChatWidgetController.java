package edu.kh.farmfarm.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import edu.kh.farmfarm.chat.model.service.ChatWidgetService;

// 채팅 위젯용 컨트롤러입니다...
// with ChatListenHandler
@Controller
public class ChatWidgetController {
	
	@Autowired
	private ChatWidgetService service;
	
	
	
}
