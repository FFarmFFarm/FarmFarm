package edu.kh.farmfarm.mypage.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Comment {
	
	private int commentNo;
	private String commentDate;
	private int commentParent;
	private String commentDelFl;
	private int memberNo;
	private int boardNo;
	private String boardTitle;
	private String commentContent;

}
