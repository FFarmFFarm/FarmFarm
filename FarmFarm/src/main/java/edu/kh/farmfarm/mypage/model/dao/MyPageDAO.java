package edu.kh.farmfarm.mypage.model.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.vo.Comment;
import edu.kh.farmfarm.mypage.model.vo.CommentPagination;

@Repository
public class MyPageDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public int commentCount(int memberNo) {
		return sqlSession.selectOne("myPageMapper.commentCount", memberNo);
	}
	
	
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
		return sqlSession.select;
	}


}
