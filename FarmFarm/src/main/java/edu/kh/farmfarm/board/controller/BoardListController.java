package edu.kh.farmfarm.board.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.board.model.service.BoardListService;
import edu.kh.farmfarm.board.model.vo.Board;

@Controller
public class BoardListController {
	
	@Autowired
	private BoardListService service;
	
	
	// 와글와글 게시판으로 이동 - 물물교환 페이지
	@GetMapping("/board")
	private String boardListPage() {
		return "/board/boardList";
	}
	
	
	

}
