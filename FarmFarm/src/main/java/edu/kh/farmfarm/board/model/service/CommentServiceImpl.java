package edu.kh.farmfarm.board.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.dao.CommentDAO;
//import edu.kh.farmfarm.board.model.vo.Comment;
import edu.kh.farmfarm.mypage.model.vo.Comment;

@Service
public class CommentServiceImpl implements CommentService{
	
	@Autowired
	private CommentDAO dao;

	
	// 댓글 불러오기~~
//	@Override
//	public List<Comment> commentList(int boardNo) {
//		return dao.commentList(boardNo);
//	}
	
	@Override
	public List<Comment> commentList(int boardNo) {
		return dao.commentList(boardNo);
	}

}
