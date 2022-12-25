package edu.kh.farmfarm.board.model.dao;

import java.util.Map;

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
	
	
	// 로그인 멤버가 좋아요 눌렀는지 확인
	public int checkLike(Map<String, Object> likeMap) {
		return sqlSession.selectOne("boardMapper.checkLike", likeMap);
	}


	// 게시글 좋아요 취소ㅜ
	public int boardLikeDelete(Map<String, Object> likeMap) {
		return sqlSession.delete("boardMapper.boardLikeDelete", likeMap);
	}


	// 게시글 좋아요~
	public int boardLikeInsert(Map<String, Object> likeMap) {
		return sqlSession.insert("boardMapper.boardLikeInsert", likeMap);
	}

}
