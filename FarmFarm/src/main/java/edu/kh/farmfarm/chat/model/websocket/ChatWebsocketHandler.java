package edu.kh.farmfarm.chat.model.websocket;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

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
		
		int result = 0;
		
		if(chat.getImgFl().equals("Y")) {
			result = 1;
		} else {
			result = service.insertChat(chat);
		}
		
		
		if(result > 0) {
			
			// 채팅방 정보를 찾음
			ChatRoom roomInfo = service.getRoomInfo(chat.getRoomNo());
			
			// 해당 채팅방의 모든 채팅을 읽음처리
			Map<String, Object> updateInfo = new HashMap<String, Object>();
			updateInfo.put("roomNo", chat.getRoomNo());
			updateInfo.put("myMemberNo", chat.getSendMemberNo());
			
			service.updateChatReadFl(updateInfo);
			
			// 현재 날짜
	        chat.setChatDate(LocalDate.now() + "");
	        
	        // 현재 시간
	        int hour = LocalTime.now().getHour();
	        int minute = LocalTime.now().getMinute();
	        String meridiem = "오전";
	        String strHour = "";
	        String strMin = "";
	        
	        if(hour > 12) {
	        	hour-= 12;
	        	meridiem = "오후";
	        	strHour = "0" + hour;
	        } else {
	        	strHour = "" + hour;
	        }
	        
	        if(minute < 10) {
	        	strMin = "0" + minute;
	        } else {
	        	strMin = "" + minute;
	        }
	        
	        chat.setChatTime(meridiem + " " + strHour  + ":" + strMin);
	 
			
			for(WebSocketSession s : sessions) {
				int loginMemberNo = ((Member)s.getAttributes().get("loginMember")).getMemberNo();
				
				if(loginMemberNo == roomInfo.getMemberNo() || loginMemberNo == roomInfo.getMemberNo2()) {
					 s.sendMessage(new TextMessage(new Gson().toJson(chat)));
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
