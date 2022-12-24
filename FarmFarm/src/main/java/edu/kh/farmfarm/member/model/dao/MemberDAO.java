package edu.kh.farmfarm.member.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.seller.model.vo.Seller;

@Repository
public class MemberDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	// 로그인 
	public Member login(String memberId) {
		return sqlSession.selectOne("memberMapper.login", memberId);
	}

	public String checkReport(int memberNo) {
		return sqlSession.selectOne("memberMapper.checkReport", memberNo);
	}

	// 회원가입(구매자) 
	public int signUp0(Member inputMember) {
		int memberNo = sqlSession.insert("memberMapper.signUp0", inputMember);
		
		// 메인 쿼리(INSERT) 성공 시 
		if(memberNo > 0) memberNo = inputMember.getMemberNo();
		
		return memberNo; // 0 또는 삽입된 멤버번호 
	}
	
	// 회원가입(판매자) 
	public int signUp1(Member inputMember) {
		int memberNo = sqlSession.insert("memberMapper.signUp1", inputMember);
		
		// 메인 쿼리(INSERT) 성공 시 
		if(memberNo > 0) memberNo = inputMember.getMemberNo();
		
		return memberNo; // 0 또는 삽입된 멤버번호 
	}

	public int insertMemberAddressList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return sqlSession.insert("memberMapper.insertMemberAddressList", map);
	}

	public int insertFarmImage(Seller farmImage) {
		return sqlSession.insert("sellerMapper.insertFarmImage", farmImage);
	}


}
