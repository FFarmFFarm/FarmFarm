package edu.kh.farmfarm.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.common.Pagination;

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

	// 와글와글 게시판 목록 불러오기
	public List<Board> seleteBoardList(Pagination pagination, int boardTypeNo) {
		
		// RowBounds 해서 특정 위치에서 지정된 행의 개수만 조회
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("boardMapper.selecBoardtList", boardTypeNo, rowBounds);
	}

}
