package edu.kh.farmfarm.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import edu.kh.farmfarm.board.model.service.CommentService;
import edu.kh.farmfarm.mypage.model.vo.Comment;

@RestController
@Controller
public class CommentController {
	
	@Autowired
	private CommentService serivce;
	
	
	// 댓글 불러오기~
	@GetMapping("/board/comment/list")
	public String commentList( int boardNo) {
		List<Comment> coList = serivce.commentList(boardNo);
		return new Gson().toJson(coList);
	}
	
	
	// 댓글 추가하기~
//	@ResponseBody
	@PostMapping("/board/comment/insert")
	public int commentWrite(Comment comment) {
		return serivce.commentWrite(comment);
	}

}
