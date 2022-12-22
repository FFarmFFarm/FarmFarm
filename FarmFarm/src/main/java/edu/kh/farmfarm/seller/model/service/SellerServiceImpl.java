package edu.kh.farmfarm.seller.model.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.postDetail.model.vo.Post;
import edu.kh.farmfarm.seller.model.dao.SellerDAO;
import edu.kh.farmfarm.seller.model.vo.SellerPagination;

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
		
		SellerPagination pagination = new SellerPagination(listCount, cp);
		
		List<Post> postList = dao.selectPostList(pagination, memberNo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("postList", postList);
		
		return map;
	}
	
}
