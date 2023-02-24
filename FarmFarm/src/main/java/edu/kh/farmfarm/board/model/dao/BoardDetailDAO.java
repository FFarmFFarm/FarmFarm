package edu.kh.farmfarm.board.model.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.board.model.vo.BoardImg;

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


	// 게시글 좋아요 취소
	public int boardLikeDelete(Map<String, Object> likeMap) {
		return sqlSession.delete("boardMapper.boardLikeDelete", likeMap);
	}


	// 게시글 좋아요
	public int boardLikeInsert(Map<String, Object> likeMap) {
		return sqlSession.insert("boardMapper.boardLikeInsert", likeMap);
	}


	// 조회수 증가
	public int updateBoardView(int boardNo) {
		return sqlSession.update("boardMapper.updateBoardView", boardNo);
	}


	// 게시글 삭제
	public int boardDelete(int boardNo) {
		return sqlSession.update("boardMapper.boardDelete", boardNo);
	}


	// 게시글 제목 + 내용 수정
	public int updateBoard(Board board) {
		return sqlSession.update("boardMapper.updateBoard", board);
	}


	// 게시글 수정 - 이미지 삭제
	public int updateDeleteImg(String condition) {
		return sqlSession.delete("boardMapper.updateDeleteImg", condition);
	}


	// 게시글 수정 - 이미지 수정 업데이트 시도
	public int updateBoardImg(BoardImg img) {
		return sqlSession.update("boardMapper.updateBoardImg", img);
	}


	// 게시글 수정 - 이미지 삽입하기
	public int boardImgInsert(BoardImg img) {
		return sqlSession.insert("boardMapper.boardImgInsert", img);
	}

}
