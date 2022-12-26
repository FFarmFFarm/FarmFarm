package edu.kh.farmfarm.board.model.service;

import java.util.Map;

import edu.kh.farmfarm.board.model.vo.Board;

public interface BoardDetailService {

	// 게시글 상세보기
	Board boardDetail(int boardNo);

	// 로그인 멤버가 좋아요 눌렀는지 확인하기~
	int checkLike(Map<String, Object> likeMap);
	
	// 게시글 좋아요 취소ㅠ
	int boardLikeDelete(Map<String, Object> likeMap);

	// 게시글 좋아요~
	int boardLikeInsert(Map<String, Object> likeMap);

	// 조회수 증가~
	int updateBoardView(int boardNo);


}
