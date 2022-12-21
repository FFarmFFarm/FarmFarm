package edu.kh.farmfarm.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.dao.MemberDAO;

@Service
public class MemberServiceImpl implements MemberService {
<<<<<<< Updated upstream
	
	@Autowired
	private MemberDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;

	@Override
	public Member login(Member inputMember) {
		
		Member loginMember = dao.login(inputMember.getMemberId());
		
		if(loginMember != null) {
			if(bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
				loginMember.setMemberPw(null);
			} else {
				loginMember = null;
			}
		}
		return loginMember;
	}
=======

	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	@Autowired
	private MemberDAO dao;

	@Override
	public Member login(Member inputMember) {
		Member loginMember = dao.login(inputMember.getMemberId());
		
//		if(loginMember != null) {
//			if(bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
//				loginMember.setMemberPw(null);
//			} else {
//				loginMember = null;
//			}
//		}
		
		return loginMember;
	}

	@Override
	public String checkReport(int memberNo) {
		return dao.checkReport(memberNo);
	}
>>>>>>> Stashed changes
}
