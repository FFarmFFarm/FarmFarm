package edu.kh.farmfarm.mypage.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.dao.MyPageDAO;
import edu.kh.farmfarm.mypage.model.vo.Comment;
import edu.kh.farmfarm.mypage.model.vo.CommentPagination;
import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.mypage.model.vo.OrderPagination;
import edu.kh.farmfarm.mypage.model.vo.Wish;
import edu.kh.farmfarm.productDetail.model.vo.Review;

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
		
		OrderPagination pagination = new OrderPagination(orderCount, cp);
		
		List<Order> orderList = dao.selectOrderList(loginMember, pagination);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("orderList", orderList);
		map.put("orderCount", orderCount);
		
		return map;
	}

	
	
	@Override
	public Map<String, Object> selectReviewList(Member loginMember, int cp) {
		
		int reviewCount = dao.reviewCount(loginMember);
		
		OrderPagination pagination = new OrderPagination(reviewCount, cp);
		
		List<Review> reviewList = dao.selectReviewList(loginMember, pagination);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("reviewList", reviewList);
		map.put("reviewCount", reviewCount);
		
		return map;
	}
	
	
	
	/** 작성 게시글 목록 조회
	 *
	 */
	@Override
	public Map<String, Object> selectBoardList(Map<String, Object> paramMap, int cp) {
		
		
		int boardCount = dao.boardCount((int)paramMap.get("memberNo"));
		
		CommentPagination pagination = new CommentPagination(boardCount, cp);
		
		List<Board> boardList = dao.selectBoardList(paramMap, pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		map.put("boardCount", boardCount);
		
		return map;
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
	
	
	
	@Override
	public Map<String, Object> selectWishList(int memberNo, int cp) {
		
		int wishCount = dao.wishCount(memberNo);
		
		OrderPagination pagination = new OrderPagination(wishCount, cp);
		
		List<Wish> wishList = dao.selectWishList(memberNo, pagination);
		 
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("wishList", wishList);
		map.put("wishCount", wishCount);
		
		return map;
	}

}
