package edu.kh.farmfarm.mypage.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.dao.MyPageDAO;
import edu.kh.farmfarm.mypage.model.vo.Comment;
import edu.kh.farmfarm.mypage.model.vo.CommentPagination;
import edu.kh.farmfarm.mypage.model.vo.OrderPagination;

@Service
public class MyPageServiceImpl implements MyPageService {
	
	@Autowired
	private MyPageDAO dao;
	
	
	/** 주문 내역 조회
	 *
	 */
	@Override
	public Map<String, Object> selectOrderList(Member loginMember, int cp) {
		
		int orderCount = dao.orderCount(loginMember);
		
		OrderPagination pagination = new OrderPagination(commentCount, cp);
		
		List<Comment> commentList = dao.selectCommentList(loginMember, pagination);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("commentList", commentList);
		
		return null;
	}

	
	
	/** 작성 댓글 목록 조회
	 *
	 */
	@Override
	public Map<String, Object> selectCommentList(int memberNo, int cp) {
		
		
		int commentCount = dao.commentCount(memberNo);
		
		CommentPagination pagination = new CommentPagination(commentCount, cp);
		
		List<Comment> commentList = dao.selectCommentList(memberNo, pagination);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("commentList", commentList);
		
		return map;
	}

}
