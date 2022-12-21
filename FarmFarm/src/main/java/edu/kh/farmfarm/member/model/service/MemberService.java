package edu.kh.farmfarm.member.model.service;

import edu.kh.farmfarm.member.model.VO.Member;

public interface MemberService {
	
	Member login(Member inputMember);

	String checkReport(int memberNo);



	
}
