package edu.kh.farmfarm.chat2.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.chat2.model.dao.Chat2DAO;
import edu.kh.farmfarm.chat2.model.vo.Chat2;
import edu.kh.farmfarm.chat2.model.vo.Chat2Enter;
import edu.kh.farmfarm.chat2.model.vo.Chat2Img;
import edu.kh.farmfarm.chat2.model.vo.Chat2Room;
import edu.kh.farmfarm.chat2.model.vo.Emoticon;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.member.model.VO.Member;

@Service
public class Chat2ServiceImpl implements Chat2Service {

	@Autowired
	private Chat2DAO dao;
	
	// 내 채팅방 목록 조회
	@Override
	public List<Chat2Room> selectChatRoomList(int memberNo) {
		return dao.selectChatRoomList(memberNo);
	}

	// 선택한 채팅방의 정보 조회
	@Override
	public Chat2Room selectChatRoom(int roomNo) {
		return dao.selectChatRoom(roomNo);
	}

	// 선택한 채팅방의 채팅 목록 조회
	@Override
	public List<Chat2> selectChatList(int roomNo, int memberNo) {
		Map<String, Object> chatMap = new HashMap<String, Object>();
		
		chatMap.put("roomNo", roomNo);
		chatMap.put("memberNo", memberNo);
		
		return dao.selectChatList(chatMap);
	}
	
	// 선택한 채팅방의 참가회원 정보 조회
	@Override
	public List<Chat2Room> selectChatRoomMemberList(int roomNo) {
		return dao.selectChatRoomMemberList(roomNo);
	}



	// 새로운 채팅방 개설하기
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertNewChatRoom(int memberNo, int sellerNo, Chat2Room chatRoom) {
		// 1. 리턴용 변수 선언
		int result = 0;
		
		// 2. 채팅방 생성 시작
		if(chatRoom.getRoomType() > 0) { // A. 상품 관련 채팅방인 경우? 중복 방지를 위해 해당 채팅방 여부를 확인 후 생성
			chatRoom.setMemberNo(memberNo);
			
			// 1. 채팅방 중복 여부를 체크
			int resultSelectChatRoom = dao.selectChatRoomExist(chatRoom);
			
			System.out.println("sdf");
			
			if(resultSelectChatRoom == 0) { // 중복이 없으면?
				
				// 2. 채팅방 생성하기
				int resultInsertNewChatRoom = dao.insertNewChatRoom(chatRoom);
				
				if(resultInsertNewChatRoom > 0) { // 채팅방이 생성되었으면?
					// 3. 채팅방 입장하기
					int roomNo = chatRoom.getRoomNo();
					
					Chat2Enter chatEnter = new Chat2Enter();
					
					chatEnter.setMemberNo(memberNo);
					chatEnter.setRoomNo(roomNo);
					chatEnter.setEnterStatus("Y");
					
					int resultInsertChatEnter = dao.insertChatEnter(chatEnter);
					
					result = resultInsertChatEnter;
					
					// 4. 판매자를 초대함(강제초대)
					chatEnter.setRoomNo(roomNo);
					chatEnter.setMemberNo(sellerNo);
					
					resultInsertChatEnter = dao.insertChatEnter(chatEnter);
					
					result = resultInsertChatEnter;
					
					// 3. 시스템 메시지 전송하기
//					if(resultInsertChatEnter > 0) {
//						Chat2 chat = new Chat2();
//						chat.setRoomNo(roomNo);
//						chat.setChatType("S");
//						chat.setChatContent("상품 문의 채팅이 시작되었습니다.");
//						
//						int resultInsertSystemChat = dao.insertNewSystemChat(chat);
//						
//						result = resultInsertSystemChat;
//					}
				}
			}
			
		} else { // B. 일반 채팅방인 경우? 즉시 생성
			// 1. 채팅방 생성하기
			int resultInsertNewChatRoom = dao.insertNewChatRoom(chatRoom);
			
			if(resultInsertNewChatRoom > 0) { // 채팅방이 생성되었으면?
				// 2. 채팅방 입장하기
				int roomNo = chatRoom.getRoomNo();
				
				Chat2Enter chatEnter = new Chat2Enter();
				
				chatEnter.setMemberNo(memberNo);
				chatEnter.setRoomNo(roomNo);
				chatEnter.setEnterStatus("Y");
				
				int resultInsertChatEnter = dao.insertChatEnter(chatEnter);
				
				result = resultInsertChatEnter;
				
				// 3. 시스템 메시지 전송하기
//				if(resultInsertChatEnter > 0) {
//					Chat2 chat = new Chat2();
//					chat.setRoomNo(roomNo);
//					chat.setChatType("S");
//					chat.setChatContent("채팅 시 서로간에 예의를 지켜주세요!");
//					
//					int resultInsertSystemChat = dao.insertNewSystemChat(chat);
//					
//					result = resultInsertSystemChat;
//				}

			}
		}
		
		return result;
	}

	// 채팅방 참가자 목록 조회
	@Override
	public List<Integer> selectEnterMemberList(int roomNo) {
		return dao.selectEnterMemberList(roomNo);
	}

	// 채팅 전송
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertNewChat(Chat2 chat) {
		return dao.insertNewChat(chat);
	}
	
	// 사진 전송
	@Transactional(rollbackFor = Exception.class)
	@Override
	public String insertNewChatImg(int roomNo, int memberNo, MultipartFile chatImg, String webPath, String folderPath) throws IllegalStateException, IOException {
		
		// 최종 결과를 담을 변수
		String newChatImgPath = null;
		
		// 사진 객체
		Chat2Img newChatImg = new Chat2Img();
		
		// 사진 이름 변경
		String rename = Util.fileRename(chatImg.getOriginalFilename());
		
		// 사진 객체 세팅
		newChatImg.setChatImgOriginal(chatImg.getOriginalFilename());
		newChatImg.setChatImgRename(rename);
		newChatImg.setChatImgPath(webPath + rename);
		
		// 먼저 채팅을 DB에 저장함(어쩔 수 없음..)
		Chat2 chat = new Chat2();
		
		chat.setRoomNo(roomNo);
		chat.setMemberNo(memberNo);
		chat.setChatType("I");
		chat.setChatContent(newChatImg.getChatImgPath());
		
		int resultInsertNewChat = dao.insertNewChat(chat);
		
		// 채팅 내용을 DB에 잘 저장했으면 사진을 저장함
		if(resultInsertNewChat > 0) {
			
			// chatNo를 newChatImg에 세팅
			int chatNo = chat.getChatNo();
			newChatImg.setChatNo(chatNo);
			
			// 사진을 DB에 저장함
			int resultInsertNewImg = dao.insertNewChatImg(newChatImg);
			
			// 사진도 잘 저장되었으면?
			if(resultInsertNewImg > 0) {
				// 사진을 디렉토리에 저장
				chatImg.transferTo(new File(folderPath+rename));
				
				newChatImgPath = newChatImg.getChatImgPath();
			}
		}
		
		// 만약 중간에 오류가 발생하면, null값이 반환됨!
		return newChatImgPath;
	}
	
	// 채팅 삭제
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int deleteChat(int memberNo, int chatNo) {
		Chat2 chat = new Chat2();
		chat.setMemberNo(memberNo);
		chat.setChatNo(chatNo);
		return dao.deleteChat(chat);
	}


	// 채팅방 정보 수정
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateChatRoom(int roomNo, String roomName) {
		Chat2Room chat2Room = new Chat2Room();
		chat2Room.setRoomNo(roomNo);
		chat2Room.setRoomName(roomName);
		
		return dao.updateChat2Room(chat2Room);
	}

	// 채팅방 입장
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertChatEnter(int roomNo, int memberNo) {
		Chat2Enter chatEnter = new Chat2Enter();
		chatEnter.setRoomNo(roomNo);
		chatEnter.setMemberNo(memberNo);
		chatEnter.setEnterStatus("Y");
		
		int result = dao.insertChatEnter(chatEnter);
		
		if(result > 0) {
			
			// 시스템 메시지 전송을 위해, 회원의 이름을 확인함
			String memberNickname = dao.selectMemberNickname(memberNo);
			
			// 메세지 내용 작성
			String chatContent = memberNickname + "님께서 입장하셨습니다.";
			
			Chat2 chat = new Chat2();
			
			chat.setRoomNo(roomNo);
			chat.setChatType("S");
			chat.setChatContent(chatContent);
			
			result = dao.insertNewSystemChat(chat);
		}
		
		return result;
	}
	
	// 채팅방 초대
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateChatEnterInvite(int roomNo, String memberNickname) {
		
		int result = 0;
		Member member = new Member();
		
		// 1. 회원 번호와, 권한을 확인함
		member = dao.selectEnterMemberInfo(memberNickname);
		
		// 2. 초대 작업을 시작
		if(member != null) {
			if(member.getAuthority() == 0) { // 0이면(구매자면)
				
				Chat2Enter chatEnter = new Chat2Enter();
				chatEnter.setMemberNo(member.getMemberNo());
				chatEnter.setRoomNo(roomNo);
				chatEnter.setEnterStatus("W");
				
				// 중복 여부를 확인함
				String checkDuplicateInvite = dao.selectDuplicateInvite(chatEnter);
				
				if(checkDuplicateInvite == null) { // 중복이 없으므로
					int inviteResult = dao.insertChatEnter(chatEnter);
					
					if(inviteResult == 1) { // 초대가 잘 된 경우!
						result = member.getMemberNo();
					} else { // 알 수 없는 오류 ㅠㅠ
						result = -4;
					}
					
				} else if(checkDuplicateInvite.equals("W")) { // 이미 초대중인 경우
					result = -3;
				} else {
					result = -2;
				}
				
			} else { // 판매자는 초대 안함
				result = 0;
			}
		} else { // 찾을 수 없음
			result = -1;
		}
			
		return result;
	}

	// 채팅방 초대 승인 or 거부
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateChatEnterApprove(int enterNo, String enterStatus) {
		Chat2Enter chatEnter = new Chat2Enter();
		
		chatEnter.setEnterNo(enterNo);
		chatEnter.setEnterStatus(enterStatus);
			
		int result = dao.updateChatEnterApprove(chatEnter);
		
//		int resultRoomNo = 0; // 시스템 메세지를 보낼 채팅방 번호
//		
//		if(result > 0) {
//			if(enterStatus.equals("Y")) {
//				resultRoomNo = dao.selectRoomNoByEnterNo(enterNo);
//			}
//		}
		
		return result;
		
		
	}

	// 채팅방 탈퇴
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int deleteChatEnter(int roomNo, int memberNo) {
		Chat2Enter chat2Enter = new Chat2Enter();
		chat2Enter.setRoomNo(roomNo);
		chat2Enter.setMemberNo(memberNo);
		
		return dao.deleteChatEnter(chat2Enter);
	}

	// 2. 입장 시 조회 처리 : UNREAD_CHAT_COUNT 0으로 만들기 J
	@Override
	public int updateUnreadCount(int memberNo, int roomNo) {
		
		Map<String, Object> updateMap = new HashMap<String, Object>();
		updateMap.put("memberNo", memberNo);
		updateMap.put("roomNo", roomNo);
		
		return dao.updateUnreadCount(updateMap);
		
	}
	
	// 1. 입장 시 조회 처리 : n명 읽음 + 1;
	@Override
	public int updateReadCount(int memberNo, int roomNo) {
		
		Map<String, Object> updateMap = new HashMap<String, Object>();
		updateMap.put("memberNo", memberNo);
		updateMap.put("roomNo", roomNo);
		
		return dao.updateReadCount(updateMap);
	}


	// 이모티콘 카테고리 리스트
	@Override
	public List<Emoticon> selectEmoticonCategoryList() {
		return dao.selectEmoticonCategoryList();
	}

	@Override
	public List<Emoticon> selectEmoticonList(int emoticonCategoryNo) {
		return dao.selectEmoticonList(emoticonCategoryNo);
	}








	
}
