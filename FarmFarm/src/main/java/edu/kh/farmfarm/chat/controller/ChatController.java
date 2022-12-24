package edu.kh.farmfarm.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.chat.model.service.ChatService;

@Controller
public class ChatController {
	
	@Autowired
	private ChatService service;
	
	@GetMapping("/chat")
	public String goChatPage() {
		return "chat/myChat";
	}
}
