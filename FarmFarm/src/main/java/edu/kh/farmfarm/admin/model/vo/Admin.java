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
	private String processContent;
	

}
