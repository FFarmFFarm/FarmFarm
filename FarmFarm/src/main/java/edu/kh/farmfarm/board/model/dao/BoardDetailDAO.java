package edu.kh.farmfarm.board.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.board.model.vo.Board;

@Repository
public class BoardDetailDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	
	// 게시글 상세보기
	public Board boardDetail(int boardNo) {
		return sqlSession.selectOne("boardMapper.boardDetail", boardNo);
	}

}
