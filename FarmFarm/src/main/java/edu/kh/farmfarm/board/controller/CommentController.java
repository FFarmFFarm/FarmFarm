package edu.kh.farmfarm.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;

import edu.kh.farmfarm.board.model.service.CommentService;
import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.vo.Comment;

@RestController
public class CommentController {
	
	@Autowired
	private CommentService serivce;
	
	
	// 댓글 불러오기
	@GetMapping("/board/comment/list")
	public String commentList( int boardNo) {
		List<Comment> coList = serivce.commentList(boardNo);
		return new Gson().toJson(coList);
	}
	
	
	// 댓글 추가
	@PostMapping("/board/comment")
	public int commentWrite(@RequestBody Comment comment) {
		
		int check = comment.getCheckok();
		
		if(check != 0) { // 비밀 댓글인 경우
			comment.setCommentDelFl("S");
		}else {
			comment.setCommentDelFl("N");
		}
		
		int result = serivce.commentWrite(comment);
		
		return result;
	}
	
	
	// 댓글을 수정
	@PutMapping("/board/comment")
	public int commentUpdate(Comment comment) {
		return serivce.commentUpdate(comment);
	}
	
	
	
	// 댓글을 삭제
	@DeleteMapping("/board/comment/{commentNo}")
	public int commentDelete(@PathVariable("commentNo") int commentNo,
			@SessionAttribute("loginMember") Member loginMember) {
		
		Comment comment = new Comment();
		comment.setCommentNo(commentNo);
		comment.setAuthority(loginMember.getAuthority());
		
		return serivce.commentDelete(comment);
	}

}
