package edu.kh.farmfarm.chat2.model.websocket;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import edu.kh.farmfarm.chat2.model.service.ChatService;
import edu.kh.farmfarm.chat2.model.vo.Chat2;
import edu.kh.farmfarm.chat2.model.vo.Chat2Enter;
import edu.kh.farmfarm.member.model.VO.Member;

public class ChatWebsocketHandler extends TextWebSocketHandler{
	
	// 챗2 서비스
	@Autowired
	private ChatService service;

	// 세션 목록을 담을 set 선언
	private Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());

	// 세션과 연결되었을 때!
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// 세션 set에 세션 추가
		sessions.add(session);
	}

	// 세션과 메세지를 주고 받았을 때!
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		ObjectMapper chatMapper = new ObjectMapper();
		
		Chat2 chat = chatMapper.readValue(message.getPayload(), Chat2.class);
		
		// 채팅 삽입
		int result = service.insertNewChat(chat);
		
		// 결과에 따라서 웹소켓 전달 여부를 결정
		if(result > 0) { // 0보다 크면 > 삽입이 정상적으로 되었으므로 > 세션에 웹소켓 전달
			
			// 해당 채팅방의 readCount를 1 증가 : 접속 시점의 시간보다 이른 시간에 도착한 메세지만 + 1;
			// 중복 접속 여부는 어떻게 판단할까? -> ENTER 테이블에 LAST_READ_CHAT_NO 추가했음
			// 두 작업은, 메세지를 수신한 후에 처리할 예정임@@@
			
			// 채팅방 정보(roomNo)를 이용해서, 해당 채팅방에 참가중인 회원을 전부 조회함
			List<Chat2Enter> enterMemberList = service.selectEnterMemberList(chat.getRoomNo());
			
			// 세션에서 회원을 찾음
			for(WebSocketSession s : sessions) {
				int memberNo = ((Member)s.getAttributes().get("loginMember")).getMemberNo();
				
				// 리스트에 회원 정보가 있으면.. 잘 될지 모르겠으니 점검 필수
				if(enterMemberList.contains(memberNo)) {
					s.sendMessage(new TextMessage(new Gson().toJson(chat)));
				}
			}
			
		} else { // 전달 안함
			
		}
	
	}

	// 세션과 연결이 종료되었을 때!
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		// 세션 set에서 세션 제거
		sessions.remove(session);
	}
	
	
}
