package edu.kh.farmfarm.board.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.board.model.vo.Board;

@Repository
public class BoardListDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	// 와글와글 네브 조회
	public List<Map<String, Object>> boardTypeList() {
		return sqlSession.selectList("boardMapper.boardTypeList");
	}

	// 와글와글 게시판 수 조회
	public int getListCount(int boardTypeNo) {
		return sqlSession.selectOne("boardMapper.getListCount", boardTypeNo);
	}

}
