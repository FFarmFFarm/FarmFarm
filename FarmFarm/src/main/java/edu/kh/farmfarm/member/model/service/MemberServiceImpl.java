package edu.kh.farmfarm.member.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.javassist.expr.NewExpr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.member.model.VO.MemberAddress;
import edu.kh.farmfarm.member.model.dao.MemberDAO;

@Service
public class MemberServiceImpl implements MemberService {
	
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
		
      System.out.println("입력한 비밀번호 : " + inputMember.getMemberPw());
      System.out.println("암호화 비밀번호 : " + bcrypt.encode(inputMember.getMemberPw()) );
		
		return loginMember;
	}

	// 신고 여부 조회 
	@Override
	public String checkReport(int memberNo) {
		return dao.checkReport(memberNo);
	}

	// 회원가입 
	@Override
	public int signUp(Member inputMember, String[] memberAddress) {
		// 1. 회원 정보 삽입 
		int memberNo = dao.signUp(inputMember);
		
		int result = 0;
		
		if(memberNo > 0) {
			// 주소가 작성 경우
			if(!memberAddress.equals(",,")) {
				inputMember.setMemberAddress(String.join(",,", memberAddress));
				String add = inputMember.getMemberAddress();
				System.out.println(add);
				
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("memberAddress", add);
				map.put("memberNo", memberNo);
				result = dao.insertMemberAddressList(map);
			}
		}
		
		return result;
	}

}
