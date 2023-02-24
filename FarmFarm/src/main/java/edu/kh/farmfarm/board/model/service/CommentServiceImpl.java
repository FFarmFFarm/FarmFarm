package edu.kh.farmfarm.board.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.farmfarm.board.model.dao.CommentDAO;
import edu.kh.farmfarm.common.Util;
import edu.kh.farmfarm.mypage.model.vo.Comment;

@Service
public class CommentServiceImpl implements CommentService{
	
	@Autowired
	private CommentDAO dao;

	
	// 댓글 불러오기
	@Override
	public List<Comment> commentList(int boardNo) {
		return dao.commentList(boardNo);
	}


	// 댓글 추가하기
	@Override
	public int commentWrite(Comment comment) {
		
		comment.setCommentContent(Util.XSSHandling(comment.getCommentContent()));
		comment.setCommentContent(Util.newLineHandling(comment.getCommentContent()));
		
		int coParent = comment.getCommentParent();
		int result = 0;
		
		System.out.println(coParent);
		
		if(coParent > 0) {
			int parentNo = dao.selectParent(coParent);
			
			if(parentNo > 0) {
				comment.setCommentParent(parentNo);
			}else {
				comment.setCommentParent(coParent);
			}
			
			result = dao.commentWrite(comment);
			
		}else {
			result = dao.commentWrite(comment);
		}
		
		
		if(result > 0) {
			result = comment.getCommentNo();
		}
		
		return result; 
	}


	// 댓글 수정하기
	@Override
	public int commentUpdate(Comment comment) {
		
		comment.setCommentContent(Util.XSSHandling(comment.getCommentContent()));
		comment.setCommentContent(Util.newLineHandling(comment.getCommentContent()));
		
		return dao.commentUpdate(comment);
	}


	// 댓글 삭제하기
	@Override
	public int commentDelete(Comment comment) {
		
		int commentNo = comment.getCommentNo();
		
		String condition;
		
		if(comment.getAuthority() == 2) {
			condition = "COMMENT_CONTENT = '관리자 권한으로 삭제된 댓글입니다.'"
					+ "WHERE COMMENT_NO =" + commentNo;
		}else {
			condition = "COMMENT_CONTENT = '삭제된 댓글입니다.'"
					+ "WHERE COMMENT_NO =" + commentNo;
		}
		
		return dao.commentDelete(condition);
	}
	

}
