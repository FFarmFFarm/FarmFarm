package edu.kh.farmfarm.board.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.dao.BoardDetailDAO;
import edu.kh.farmfarm.board.model.vo.Board;

@Service
public class BoardDetailServiceImpl implements BoardDetailService{
	
	@Autowired
	private BoardDetailDAO dao;

	
	// 게시글 상세보기
	@Override
	public Board boardDetail(int boardNo) {
		return dao.boardDetail(boardNo);
	}


	// 로그인 멤버가 좋아요 눌렀는지 확인
	@Override
	public int checkLike(Map<String, Object> likeMap) {
		return dao.checkLike(likeMap);
	}
	
	
	
	// 게시글 좋아요 취소ㅠ
	@Override
	public int boardLikeDelete(Map<String, Object> likeMap) {
		return dao.boardLikeDelete(likeMap);
	}


	// 게시글 좋아요~
	@Override
	public int boardLikeInsert(Map<String, Object> likeMap) {
		return dao.boardLikeInsert(likeMap);
	}


	// 조회수 증가~
	@Override
	public int updateBoardView(int boardNo) {
		return dao.updateBoardView(boardNo);
	}



}
