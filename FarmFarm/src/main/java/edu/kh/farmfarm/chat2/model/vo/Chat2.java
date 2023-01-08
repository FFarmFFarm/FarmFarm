package edu.kh.farmfarm.chat2.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 채팅
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Chat2 {

	private int chatNo;
	private int roomNo;
	private int memberNo;
	private String chatType;
	private String chatContent;
	private String chatTime;
	private int readCount;
	
	// 추가 값
	private String memberNickname;
	private String profileImg;
	private int lastReadChatNo;
}
