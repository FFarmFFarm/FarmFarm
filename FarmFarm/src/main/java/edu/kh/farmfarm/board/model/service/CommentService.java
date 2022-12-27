package edu.kh.farmfarm.board.model.service;

import java.util.List;

import edu.kh.farmfarm.mypage.model.vo.Comment;

//import edu.kh.farmfarm.board.model.vo.Comment;

public interface CommentService {


	
	// 댓글 불러오기~
	List<Comment> commentList(int boardNo);

	
	// 댓글 추가하기~
	int commentWrite(Comment comment);

}
