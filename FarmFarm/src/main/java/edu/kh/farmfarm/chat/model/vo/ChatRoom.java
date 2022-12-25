package edu.kh.farmfarm.chat.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatRoom {
	
	private int roomNo;
	private String roomDate;
	
	private int memberNo;
	private String memberNickname;
	private String profileImg;
	private String memberFl;
	
	private int memberNo2;
	private String memberFl2;
	private String memberNickname2;
	private String profileImg2;
	
	private String closedFl;
	
	private String lastChatTime;
	private String lastChatContent;
	
}
