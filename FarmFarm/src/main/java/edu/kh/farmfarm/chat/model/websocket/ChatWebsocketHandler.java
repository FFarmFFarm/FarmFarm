package edu.kh.farmfarm.chat.model.websocket;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.kh.farmfarm.chat.model.service.ChatService;
import edu.kh.farmfarm.chat.model.vo.Chat;
import edu.kh.farmfarm.chat.model.vo.ChatRoom;
import edu.kh.farmfarm.member.model.VO.Member;


public class ChatWebsocketHandler extends TextWebSocketHandler {

	
	@Autowired
	private ChatService service;
	
	private Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		ObjectMapper chatMapper = new ObjectMapper();
		
		Chat chat = chatMapper.readValue(message.getPayload(), Chat.class);
		
		int result =  service.insertChat(chat);
		
		if(result > 0) {
			
			// 채팅방 정보를 찾음
			ChatRoom roomInfo = service.getRoomInfo(chat.getRoomNo());
			
			for(WebSocketSession s : sessions) {
				int loginMemberNo = ((Member)s.getAttributes().get("loginMember")).getMemberNo();
				
				if(loginMemberNo == roomInfo.getMemberNo() || loginMemberNo == roomInfo.getMemberNo2()) {
					s.sendMessage(message);
				}
			}
		}
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}
	
	
	
	
}
