package edu.kh.farmfarm.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.common.Pagination;
import edu.kh.farmfarm.member.model.VO.Member;

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
	public List<Board> selecBoardtList(Pagination pagination, Map<String, Object> searchMap) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		RowBounds rowbounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("boardMapper.selecBoardtList", searchMap, rowbounds);
	}

	
	
	// 검색조건에 맞는 게시판 수 조회
	public int getListCount(Map<String, Object> searchMap) {
		return sqlSession.selectOne("boardMapper.getListCountSearch", searchMap);
	}
	
	// 검색조건에 맞는 게시판 리스트 불러오기
	public List<Board> selecBoardtListSearch(Pagination pagination, Map<String, Object> searchMap) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		RowBounds rowbounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("boardMapper.selecBoardtListSearch", searchMap, rowbounds);
	}
	
	

	// 프로필 클릭시 모달 
	public Member selectMember(int memberNo) {
		return sqlSession.selectOne("memberMapper.selectMember", memberNo);
	}

}
