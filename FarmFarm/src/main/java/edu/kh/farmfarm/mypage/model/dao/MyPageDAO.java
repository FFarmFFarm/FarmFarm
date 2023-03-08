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


	/** 구매 확정
	 * @param orderNo
	 * @return
	 */
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
		return sqlSession.update("myPageMapper.updateImg", img);
	}


	public int updateMember(Member inputMember) {
		return sqlSession.update("myPageMapper.updateMember", inputMember);
	}


	public int updateAddress(Map<String, Object> map) {
		return sqlSession.update("myPageMapper.updateAddress", map);
	}


	public String selectEncPw(int memberNo) {
		return sqlSession.selectOne("myPageMapper.selectEncPw", memberNo);
	}


	public int updatePw(Map<String, Object> map) {
		return sqlSession.update("myPageMapper.updatePw", map);
	}


	/** 마이페이지 회원 탈퇴 
	 * @return
	 */
	public int secession(int memberNo) {
		return sqlSession.update("myPageMapper.secession", memberNo);
	}



	/** 찜 삭제
	 * @param map
	 * @return
	 */
	public int deleteWish(Map<String, Object> map) {
		return sqlSession.delete("myPageMapper.deleteWish", map);
	}


	/** 주문 조회
	 * @param orderNo
	 * @return
	 */
	public Order selectOrder(int orderNo) {
		return sqlSession.selectOne("orderMapper.selectOrder", orderNo);
	}


	/** 배경 이미지 이름 조회
	 * @return
	 */
	public List<String> selectBgImageList() {
		return sqlSession.selectList("myPageMapper.selectBgImageList");
	}
	
	
	/** 프로필 이미지 이름 조회
	 * @return
	 */
	public List<String> selectProfileImageList() {
		return sqlSession.selectList("myPageMapper.selectProfileImageList");
	}


	/** 리뷰 이미지 변경명 조회
	 * @return
	 */
	public List<String> selectReviewImageList() {
		return sqlSession.selectList("myPageMapper.selectReviewImageList");
	}


	/** 기본 배경이미지로 변경
	 * @param loginMember
	 * @return
	 */
	public int defaultBgImg(Member loginMember) {
		return sqlSession.update("myPageMapper.defaultBgImg", loginMember);
	}

	
	/** 멤버 정보 조회
	 * @param memberNo
	 * @return memberInfo
	 */
	public Member selectMemberInfo(int memberNo) {
		return sqlSession.selectOne("sellerMapper.selectMemberInfo", memberNo);
	}


	public int updateSoldout(String condition) {
		return sqlSession.update("postListMapper.updateSoldout",condition);
	}





}
