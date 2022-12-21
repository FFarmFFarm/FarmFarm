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
	private String memberTel;
	private String memberAddress;
	private String signupDate;
	private String memberDelFl;
	private int authority;
	private String profileImg;
	private String mypageImg;
	
}
