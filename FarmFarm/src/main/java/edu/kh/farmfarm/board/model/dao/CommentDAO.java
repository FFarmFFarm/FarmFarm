package edu.kh.farmfarm.board.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.mypage.model.vo.Comment;

//import edu.kh.farmfarm.board.model.vo.Comment;

@Repository
public class CommentDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	
	// 댓글 불러오기~~~
//	public List<Comment> commentList(int boardNo) {
//		return sqlSession.selectList("boardMapper.commentList", boardNo);
//	}
	public List<Comment> commentList(int boardNo) {
		return sqlSession.selectList("boardMapper.commentList", boardNo);
	}

}
