package edu.kh.farmfarm.chat2.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 채팅 기록
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Chat2Enter {
	
	private int enterNo;
	private int roomNo;
	private int memberNo;
	private String enterStatus;
	private int lastReadChatNo;
}
