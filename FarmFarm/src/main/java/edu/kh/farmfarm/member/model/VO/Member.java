package edu.kh.farmfarm.member.model.VO;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
public class Member {
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
	private String memberAddress2;
	private int boardCount;
	private int commentCount;
	private int orderCount;
}
