package edu.kh.farmfarm.chat2.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 채팅 이미지
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Chat2Img {

	private int chatImgNo;
	private int chatNo;
	private String chatImgOriginal;
	private String chatImgRename;
	private String chatImgPath;
}
