package edu.kh.farmfarm.chat2.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;

import edu.kh.farmfarm.chat2.model.service.Chat2Service;
import edu.kh.farmfarm.chat2.model.vo.Chat2;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;
import edu.kh.farmfarm.member.model.VO.Member;

@Controller
@RequestMapping("/chat")
@SessionAttributes("loginMember")
public class Chat2Controller {

	@Autowired
	private Chat2Service service;
	
	// 채팅방 페이지로 이동(임시)
	@GetMapping("/center")
	public String forwardChatPage() {
		return "chat2/chatCenter";
	}
	
	// 채팅 페이지로 이동하기 전 걸러내는 메서드
	@PostMapping("/bridge") 
	public String bridgetToChat( RedirectAttributes ra,
							     @RequestHeader(value = "referer") String referer, HttpSession session) {
		String path = "";
 
		if(session.getAttribute("loginMember") != null) { 
			path = "/chat/center"; 
		} else {
			ra.addFlashAttribute("message", "로그인 후 이용가능합니다."); path = "/login"; 
		} 
		
		return "redirect:" + path; 
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
		
		// 1. 방 번호를 이용해서, 해당 방의 정보(썸네일 이미지, 타이틀)을 조회함
		Chat2Room chatRoom = service.selectChatRoom(roomNo);
		
		// 2. 방 번호를 이용해서, 해당 방의 채팅 목록을 조회함
		List<Chat2> chatList = service.selectChatList(roomNo);
		
		// 전부 map에 담아서 반환
		Map<String, Object> chatMap = new HashMap<String, Object>();
		
		chatMap.put("chatRoom", chatRoom);
		chatMap.put("chatList", chatList);
		
		return new Gson().toJson(chatMap);
	}
	
	// 선택한 채팅방의 참가자 명단을 조회(SELECT)
	@PostMapping("/select/members")
	@ResponseBody
	public String selectChatRoomMemberList(int roomNo) {
		
		List<Chat2Room> memberList = service.selectChatRoomMemberList(roomNo);
		
		// 전부 map에 담아서 반환
		Map<String, Object> chatMap = new HashMap<String, Object>();
		
		chatMap.put("memberList", memberList);
		
		return new Gson().toJson(chatMap);
	}
	
	// 새 채팅방 개설(INSERT)
	// 개설 후 바로 참가 DAO가 실행됨
	// 판매 유형이 아닌 경우, sellerNo에 -1을 넣어주시면 좋습니다.
	@PostMapping("/insert/newRoom")
	public String insertNewChatRoom(int sellerNo, int roomType, String newRoomName,
				  HttpSession session,
			 	  @RequestHeader(value = "referer") String referer,
			 	  RedirectAttributes ra) {
		
		String path = "";
		String message = "";
		
		if(session.getAttribute("loginMember")!=null) {
			Member member = (Member)(session.getAttribute("loginMember"));
			
			int memberNo = member.getMemberNo();
			int memberAuth = member.getAuthority();
			
			if(memberAuth == 0) {
				
				// 방 객체를 생성해 전달해서 방을 생성하고, 해당 방의 번호를 가져옴
				// 만약, 생성에 실패하면 -1이 반환될 예정임
				Chat2Room chatRoom = new Chat2Room();
				
				chatRoom.setRoomName(newRoomName);
				chatRoom.setRoomType(roomType);
				
				int roomNo = service.insertNewChatRoom(memberNo, sellerNo, chatRoom);
				
				path = "/chat/center";
				
			} else {
				
				message = "구매자 아이디만 이용 가능합니다.";
			}

			
		} else {
			message = "로그인 후 이용가능합니다.";
			
			path = referer;
		}
		
		// 결과를 반환
		ra.addFlashAttribute("message", message);
		return "redirect:" + path;
	}

	
	// 채팅방 수정(UPDATE)
	@PostMapping("/update/roomInfo/{roomNo}")
	@ResponseBody
	public String updateChat2Room(
			@PathVariable(value="roomNo", required = true) int roomNo,
			String roomName) {
		
		// 방 번호와, 수정할 내용을 전달 받아 방을 수정함
		int result = service.updateChatRoom(roomNo, roomName);
		
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
		int result = service.insertChatEnter(roomNo, memberNo);
		
		// 전달할 메세지
		int chatSystem = result; // 1 : "참가완료" (참고 : 참가 시에는 메세지가 출력되지 않음)
								 // 0 : "일시적인 오류로 인해 채팅방 입장에 실패하였습니다."
		
		return new Gson().toJson(chatSystem);
	}
	
	// 채팅방 탈퇴(UPDATE)
	@PostMapping("/delete/chatEnter")
	@ResponseBody
	public String deleteChatEnter(int roomNo, int memberNo) {
		
		// 방 번호와, 회원 번호를 전달받아서, 채팅방에서 탈퇴(delete가 아닌 update)
		int result = service.deleteChatEnter(roomNo, memberNo);
		
		// 전달할 메세지
		int chatSystem = result; // 1 : "탈퇴완료" (참고 : 탈퇴 시에는 메세지가 출력되지 않음)
								 // 0 : "일시적인 오류로 인해 채팅방 탈퇴에 실패하였습니다."
		
		return new Gson().toJson(chatSystem);
	}
	
	// 채팅방 초대(INSERT)
	@PostMapping("/insert/chatEnter/invite")
	@ResponseBody
	public String updateChatEnterInvite(
			int roomNo, String memberNickname
			) {
		// 초대 - 회원 번호 or 0(판매자는 초대 불가), -1(찾을 수 없음), -2(중복), -3(이미 초대중)
		int memberNo = service.updateChatEnterInvite(roomNo, memberNickname);
		
		// 
		return new Gson().toJson(memberNo);
	}
	
	// 초대 승인 or 거부(UPDATE)
	@PostMapping("/update/chatEnter/approve")
	@ResponseBody
	public String updateChatEnterApprove(
			int enterNo, String enterStatus
			) {
		
		// 초대 승인 또는 거부(1 이상은 처리 성공, 0은 처리 실패)
		int resultRoomNo = service.updateChatEnterApprove(enterNo, enterStatus);
		
		return new Gson().toJson(resultRoomNo);
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
	
	
	// 입장 시 채팅 
//	@PostMapping("/insert/system")
//	@ResponseBody
//	public String insertNewSystenChat(int roomNo, String chatContent) {
//		
//		int result = service.insertNewSystemChat(roomNo, chatContent);
//		
//		return new Gson().toJson(result);
//	}
	
	// 입장 시 조회
	@PostMapping("/update/view")
	@ResponseBody
	public String updateView(int roomNo, int memberNo) {
		
		int result = service.updateView(roomNo, memberNo);
		
		return new Gson().toJson(result);
	}
}	
