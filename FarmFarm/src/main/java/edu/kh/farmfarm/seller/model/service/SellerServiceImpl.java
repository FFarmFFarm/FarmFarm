package edu.kh.farmfarm.seller.model.service;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.seller.model.dao.SellerDAO;

@Service
public class SellerServiceImpl implements SellerService{

	@Autowired
	private SellerDAO dao;

	
	// 멤버 기본정보 조회
	@Override
	public Member selectMemberInfo(int memberNo) {
		return dao.selectMemberInfo(memberNo);
	}
		
	// 판매글 리스트 조회
	@Override
	public Map<String, Object> selectPostList(int cp, int memberNo) {
		
		int listCount = dao.getListCount(memberNo);
		
		return null;
	}
	
}
