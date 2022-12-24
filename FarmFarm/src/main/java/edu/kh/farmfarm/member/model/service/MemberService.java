package edu.kh.farmfarm.member.model.service;

import java.util.List;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.VO.MemberAddress;

public interface MemberService {
	
	Member login(Member inputMember);

	String checkReport(int memberNo);

//	int signUp(Member inputMember);

	int signUp(Member inputMember, String[] memberAddress);



	
}
