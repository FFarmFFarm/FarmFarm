package edu.kh.farmfarm.board.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.mypage.model.vo.Comment;


@Repository
public class CommentDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	
	// 댓글 불러오기~~~
	public List<Comment> commentList(int boardNo) {
		return sqlSession.selectList("boardMapper.commentList", boardNo);
	}


	// 댓글 추가하기~
	public int commentWrite(Comment comment) {
		return sqlSession.insert("boardMapper.commentWrite", comment);
	}


	// 댓글 수정하기~~
	public int commentUpdate(Comment comment) {
		return sqlSession.update("boardMapper.commentUpdate", comment);
	}


	// 댓글 삭제하기~~~
	public int commentDelete(String condition) {
		return sqlSession.update("boardMapper.commentDelete", condition);
	}


	// 댓글의 부모의 댓글번호를 찾자
	public int selectParent(int coParent) {
		return sqlSession.selectOne("boardMapper.selectParent", coParent);
	}

}
