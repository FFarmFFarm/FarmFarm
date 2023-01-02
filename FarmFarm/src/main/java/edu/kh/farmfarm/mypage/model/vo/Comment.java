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
	private int boardTypeNo;
	private int commentCount;
	private String boardTitle;
	private String commentContent;
	
	private String memberNickname; // 회원 닉네임
	private String profileImg; // 회원 프로필 이미지
	
	private int authority; // 권한 
	
	private int parentNo; // 부모댓글의 회원번호

}
