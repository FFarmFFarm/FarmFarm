package edu.kh.farmfarm.chat2.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 채팅 출입기록
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Chat2Room {

	private int roomNo;
	private String roomName;
	private int roomType;
	private int roomStatus;
	
	// 추가 객체값
	// 채팅방 가입/접속 기록
	private int enterNo;
	private int memberNo;
	private String enterStatus;
	private int lastReadChatNo;
	
	// 이름, 프로필
	private String memberNickname;
	private String profileImg;
	
	// 제목, 이미지
	private String postTitle;
	private String thumbnailImg;
	
	// 마지막 채팅 정보
	private String lastChatTime;
	private String lastChatContent;
	private String lastChatType;
	private int unreadChatCount;
}
