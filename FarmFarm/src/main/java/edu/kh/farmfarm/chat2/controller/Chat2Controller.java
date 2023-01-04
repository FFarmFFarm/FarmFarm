package edu.kh.farmfarm.chat2.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

import edu.kh.farmfarm.chat2.model.service.Chat2Service;
import edu.kh.farmfarm.chat2.model.vo.Chat2;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;

@Controller
@RequestMapping("/chat")
public class Chat2Controller {

	@Autowired
	private Chat2Service service;
	
	// 채팅방 페이지로 이동(임시)
	@GetMapping("/center")
	public String forwardChatPage() {
		return "chat2/chatCenter";
	}
	
	// 내 채팅방 목록 조회(SELECT)
	@PostMapping("/select/room")
	@ResponseBody
	public String selectChatRoomList(int memberNo) {
		
		// 회원 정보를 이용해서, 내 채팅방 목록 및 데이터를 조회함
		List<Chat2Room> chatRoomList = service.selectChatRoomList(memberNo);
		
		// map에 담아서 반환
		Map<String, Object> chatRoomMap = new HashMap<String, Object>();
		
		chatRoomMap.put("chatRoomList", chatRoomList);
		
		return new Gson().toJson(chatRoomMap);
	}
	
	// 선택한 채팅방의 대화 내용을 조회(SELECT)
	@PostMapping("/select/{roomNo}")
	@ResponseBody
	public String selectChatList(
			@PathVariable(value="roomNo", required = true) int roomNo) {
		
		// 방 번호를 이용해서, 해당 방의 채팅 목록을 조회함
		List<Chat2> chatList = service.selectChatList(roomNo);
		
		// map에 담아서 반환
		Map<String, Object> chatMap = new HashMap<String, Object>();
		
		chatMap.put("chatList", chatList);
		
		return new Gson().toJson(chatMap);
	}
	
	// 새 채팅방 개설(INSERT)
	// 개설 후 바로 참가 DAO가 실행됨
	@PostMapping("/insert/newRoom")
	@ResponseBody
	public String insertNewChat2Room(int memberNo, int roomType) {
		
		// 방 객체를 생성해 전달해서 방을 생성하고, 해당 방의 번호를 가져옴
		// 만약, 생성에 실패하면 -1이 반환될 예정임
		Chat2Room chatRoom = new Chat2Room();
		
		chatRoom.setRoomName("새 채팅방");
		chatRoom.setRoomType(roomType);
		
		int roomNo = service.insertNewChat2Room(memberNo, chatRoom);
		
		// 결과를 반환
		return new Gson().toJson(roomNo);
	}
	
	// 채팅방 수정(UPDATE)
	@PostMapping("/update/roomInfo/{roomNo}")
	@ResponseBody
	public String updateChat2Room(
			@PathVariable(value="roomNo", required = true) int roomNo,
			String roomName) {
		
		// 방 번호와, 수정할 내용을 전달 받아 방을 수정함
		int result = service.updateChat2Room(roomNo, roomName);
		
		// 전달할 메세지
		int chatSystem = result; // 1 : "제목이 수정되었습니다.";
								 // 0 : "일시적인 오류로 인해 제목 수정에 실패하였습니다.";
		
		return new Gson().toJson(chatSystem);
	}
	
	// 채팅방 참가(INSERT)
	@PostMapping("/insert/chatEnter/{roomNo}")
	@ResponseBody
	public String insertChat2Enter(
			@PathVariable(value="roomNo", required = true) int roomNo,
			int memberNo) {
		
		// 방 번호와, 회원 번호를 전달받아서, 채팅방에 참가함
		int result = service.insertChat2Enter(roomNo, memberNo);
		
		// 전달할 메세지
		int chatSystem = result; // 1 : "참가완료" (참고 : 참가 시에는 메세지가 출력되지 않음)
								 // 0 : "일시적인 오류로 인해 채팅방 입장에 실패하였습니다."
		
		return new Gson().toJson(chatSystem);
	}
	
	// 채팅방 탈퇴(UPDATE)
	@PostMapping("/update/chatEnter/{roomNo}")
	@ResponseBody
	public String updateChat2Enter(
			@PathVariable(value="roomNo", required = true) int roomNo,
			int memberNo) {
		
		// 방 번호와, 회원 번호를 전달받아서, 채팅방에서 탈퇴(delete가 아닌 update)
		int result = service.updateChat2Enter(roomNo, memberNo);
		
		// 전달할 메세지
		int chatSystem = result; // 1 : "탈퇴완료" (참고 : 탈퇴 시에는 메세지가 출력되지 않음)
								 // 0 : "일시적인 오류로 인해 채팅방 탈퇴에 실패하였습니다."
		
		return new Gson().toJson(chatSystem);
	}

	// 채팅 삭제 처리(UPDATE)

	// 사진형식 채팅 전송(INSERT)
	@PostMapping("/insert/img")
	@ResponseBody
	public String insertNewChatImg(
			int roomNo, int memberNo, MultipartFile chatImg, HttpSession session) throws IllegalStateException, IOException {
		
		// webPath
		String webPath = "/resources/images/chat2/storage";
		
		// 폴더 경로
		String folderPath = session.getServletContext().getRealPath(webPath);
	
		// 삽입
		String newChatImgPath = service.insertNewChatImg(roomNo, memberNo, chatImg, webPath, folderPath);
		
		return new Gson().toJson(newChatImgPath);
	}
}	
