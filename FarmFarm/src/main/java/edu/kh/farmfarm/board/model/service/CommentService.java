package edu.kh.farmfarm.board.model.service;

import java.util.List;

import edu.kh.farmfarm.mypage.model.vo.Comment;


public interface CommentService {


	
	// 댓글 불러오기
	List<Comment> commentList(int boardNo);

	
	// 댓글 추가하기
	int commentWrite(Comment comment);


	// 댓글 수정하기
	int commentUpdate(Comment comment);


	// 댓글 삭제하기
	int commentDelete(Comment comment);

}
