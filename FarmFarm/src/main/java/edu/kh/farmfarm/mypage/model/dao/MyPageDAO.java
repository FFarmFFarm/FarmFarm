package edu.kh.farmfarm.mypage.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.vo.Comment;
import edu.kh.farmfarm.mypage.model.vo.CommentPagination;
import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.mypage.model.vo.OrderPagination;
import edu.kh.farmfarm.mypage.model.vo.Wish;
import edu.kh.farmfarm.productDetail.model.vo.Review;
import edu.kh.farmfarm.productDetail.model.vo.ReviewImg;

@Repository
public class MyPageDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 작성 댓글 개수
	 * @param memberNo
	 * @return
	 */
	public int commentCount(int memberNo) {
		return sqlSession.selectOne("myPageMapper.commentCount", memberNo);
	}
	
	
	/** 작성 댓글 목록
	 * @param memberNo
	 * @param pagination
	 * @return
	 */
	public List<Comment> selectCommentList(int memberNo, CommentPagination pagination) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		
		
		return sqlSession.selectList("myPageMapper.selectCommentList", memberNo, rowBounds);
	}


	/** 주문 목록 개수
	 * @param loginMember
	 * @return
	 */
	public int orderCount(Member loginMember) {
		return sqlSession.selectOne("myPageMapper.orderCount", loginMember);
	}


	/** 주문 목록 
	 * @param loginMember
	 * @param pagination
	 * @return
	 */
	public List<Order> selectOrderList(Member loginMember, OrderPagination pagination) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		
		
		return sqlSession.selectList("myPageMapper.selectOrderList", loginMember, rowBounds);
	}

	
	/** 작성 후기 수 조회
	 * @param loginMember
	 * @return
	 */
	public int reviewCount(Member loginMember) {
		return sqlSession.selectOne("myPageMapper.reviewCount", loginMember);
	}
	
	
	/** 작성 후기 목록 조회
	 * @param loginMember
	 * @param pagination
	 * @return
	 */
	public List<Review> selectReviewList(Member loginMember, OrderPagination pagination) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		
		
		return sqlSession.selectList("myPageMapper.selectReviewList", loginMember, rowBounds);
	}
	
	
  
	/** 작성 게시글 수 조회
	 * @param memberNo
	 * @return
	 */
	public int boardCount(int memberNo) {
		return sqlSession.selectOne("myPageMapper.boardCount", memberNo);
	}


	/** 작성 게시글 목록 조회
	 * @param memberNo
	 * @param pagination
	 * @return
	 */
	public List<Board> selectBoardList(Map<String, Object> paramMap, CommentPagination pagination) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		

		return sqlSession.selectList("myPageMapper.selectBoardList", paramMap, rowBounds);
	}


	/** 찜 개수 조회
	 * @param memberNo
	 * @return
	 */
	public int wishCount(int memberNo) {
		return sqlSession.selectOne("myPageMapper.wishCount", memberNo);
	}


	/** 찜 목록 조회
	 * @param memberNo
	 * @param pagination
	 * @return
	 */
	public List<Wish> selectWishList(int memberNo, OrderPagination pagination) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		return sqlSession.selectList("myPageMapper.selectWishList", memberNo, rowBounds);
	}


	/** 마이페이지 배경 사진 수정
	 * @param loginMember
	 * @return
	 */
	public int updateBgImg(Member loginMember) {
		return sqlSession.update("myPageMapper.updateBgImg", loginMember);
	}


	public int orderConfirm(int orderNo) {
		return sqlSession.update("myPageMapper.orderConfirm", orderNo);
	}


	/** 리뷰 등록
	 * @param review
	 * @return
	 */
	public int writeReview(Review review) {
		return sqlSession.insert("myPageMapper.insertReview", review);
	}


	public int insertReviewImgList(List<ReviewImg> reviewImgList) {
		return sqlSession.insert("myPageMapper.insertReviewImgList", reviewImgList);
	}


	public int checkImg(Member loginMember) {
		return sqlSession.selectOne("myPageMapper.checkimg",loginMember);
	}


	public int updateImg(Member img) {
		return sqlSession.update("mypageMapper.updateImg", img);
	}








}
