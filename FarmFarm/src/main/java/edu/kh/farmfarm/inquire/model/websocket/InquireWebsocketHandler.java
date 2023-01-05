package edu.kh.farmfarm.inquire.model.websocket;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import edu.kh.farmfarm.inquire.model.service.InquireService;
import edu.kh.farmfarm.inquire.model.vo.InquireRoom;
import edu.kh.farmfarm.inquire.model.vo.Message;
import edu.kh.farmfarm.member.model.VO.Member;

public class InquireWebsocketHandler extends TextWebSocketHandler{
	
	@Autowired
	private InquireService service;
	
	private Logger logger = LoggerFactory.getLogger(InquireWebsocketHandler.class);
	
	private Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
//	비동기인 hashset을 동기식으로 변경

//	클라이언트와 연결이 완료되고 통신할 준비가 되면 수행되는 메서드
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//		WebSocketSession session: 클라이언트와 서버간의 전이중통신을 담당하는 객체
//		웹소켓에 접속한 회원의 HttpSession을 훔쳐서 가지고있음
		
		sessions.add(session);
//		현재 접속한 회원의 세션을 모아둠
		
		
		
	}

//	클라이언트로 부터 텍스트 메세지를 받으면 수행되는 메서드
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
//		전달 받은 내용 확인
		logger.info("전달 받은 내용: " + message.getPayload());
		
//		Jackson-bind에서 제공하는 ObjectMapper 객체 사용
		
//		JSON을 해석해서 지정된 VO로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		
		Message msg = objectMapper.readValue(message.getPayload(), Message.class);
		
		logger.debug(msg.toString());
		
//		메세지 DB에 insert
		int messageNo =  service.insertMessage(msg);
		
		
		InquireRoom inquire = null;
		if(messageNo > 0) {

			msg = service.selectMessage(messageNo);
			logger.debug(msg.toString());
			
//			해당 채팅방에 있는 멤버 번호 가져오기
			inquire = service.memberNoList(msg);
			logger.debug(inquire.toString());
		}
		
//		msg 객체(채팅방 번호, 보낸 사람 번호, 내용, 보낸 시간)
//		-> JSON 변환
//		-> 로그인 한 회원 중 대상번호, 보낸 사람 번호가 일치하는 2명에게 웹소켓으로 전달
		for(WebSocketSession s : sessions) {
			
//			로그인된 회원 정보 중 회원정보 얻어오기
			int loginMemberNo = ((Member)s.getAttributes().get("loginMember")).getMemberNo();
			logger.debug("loginMemberNo: " + loginMemberNo);
			
//			로그인 상태인 회원 중 targetNo가 일치하는 회원에게 메세지 전달
			if(loginMemberNo == inquire.getMemberNo() || loginMemberNo == inquire.getMemberNo2()) {
				s.sendMessage(new TextMessage(new Gson().toJson(msg)));
			}
			
		}
	}

//	클라이언트와 연결이 끊기면 수행되는 메서드
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
//		나간 회원의 세션을 set에서 지움
	}
	
	

}
