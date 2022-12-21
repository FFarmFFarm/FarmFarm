package edu.kh.farmfarm.board.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.board.model.vo.Board;

@Repository
public class BoardWriteDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<Map<String, Object>> boardTypeList() {
		return sqlSession.selectList("boardMapper.boardTypeList");
	}

	// 게시글 삽입 시도
	public int boardWrtie(Board board) {
		
		int result = sqlSession.insert("boardMapper.boardWrite", board);
		
		if(result>0) result = board.getBoardNo();
		
		return result;
	}

}
