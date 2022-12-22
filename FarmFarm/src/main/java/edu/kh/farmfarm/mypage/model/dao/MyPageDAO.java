package edu.kh.farmfarm.mypage.model.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.vo.Comment;
import edu.kh.farmfarm.mypage.model.vo.CommentPagination;
import edu.kh.farmfarm.mypage.model.vo.Order;
import edu.kh.farmfarm.mypage.model.vo.OrderPagination;

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


}
