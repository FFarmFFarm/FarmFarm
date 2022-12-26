package edu.kh.farmfarm.chat.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatImg {
	private int chatImgNo;
	private int chatNo;
	private String chatImgOriginal;
	private String chatImgRename;
	private String chatImgPath;
	private String chatImgDelFl;
}
