package edu.kh.farmfarm.admin.model.vo;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@ToString
public class Admin {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberName;
	private String memberNickname;
	private String to;
	private String signUpDate;
	private String memberDelFl;
	private String memberBirth;
	private int authority;
	private String profileImg;
	private String mypageImg;
	private String farmImg;
	private String authDate;
	private int postCount;
	private String memberAddress;
	private int boardCount;
	private int commentCount;
	private int orderCount;
	
	private int addressNo;
	private String defaultFl;

	private int reportNo;
	private String reportType;
	private int reportMemberNo;
	private int reportTargetNo;
	private String reportReason;
	private String reportDate;
	private String reportPenalty;
	private String processDate;
	private String reportContent;
	
	
	private int boardNo; // 게시글 번호
	private String boardTitle; // 게시글 제목
	private String boardContent; // 게시글 내용
	private String boardDelFlag; // 게시글 삭제여부
	
	
	private int postNo;
	private String postTitle;
	private String postContent;
	private String postDelFl;
	
	
	private String title;  //게시글 제목 (판매글, 커뮤니티게시글)
	private String content; // 게시글 내용 (판매글, 커뮤니티게시글)
	private int reportVolume;  // 한 타겟당 누적 신고 횟수
	private int contentNo;  // 게시글 번호 (판매글, 커뮤니티게시글)
}
