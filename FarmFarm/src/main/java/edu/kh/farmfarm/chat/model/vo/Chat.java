package edu.kh.farmfarm.chat.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Chat {
	
	private int roomNo;
	private int chatNo;
	private String chatContent;
	private int sendMemberNo;
	private String chatDelFl;
	private String readFl;
	private String chatTime;
}
