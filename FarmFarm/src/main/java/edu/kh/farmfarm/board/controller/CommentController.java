package edu.kh.farmfarm.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import edu.kh.farmfarm.board.model.service.CommentService;
import edu.kh.farmfarm.mypage.model.vo.Comment;
//import edu.kh.farmfarm.board.model.vo.Comment;

@Controller
public class CommentController {
	
	@Autowired
	private CommentService serivce;
	
	
	@GetMapping("/board/comment/list")
	public String commentList( int boardNo) {
//		List<Comment> coList = serivce.commentList(boardNo);
		List<Comment> coList = serivce.commentList(boardNo);
		return new Gson().toJson(coList);
	}

}
