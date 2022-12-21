package edu.kh.farmfarm.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.board.model.service.BoardDetailService;

@Controller
public class BoardDetailController {
	
	@Autowired
	private BoardDetailService serivce;
	
	@GetMapping("/board/list")
	public String boardListPage() {
		return "/board/boardList";
	}
	@GetMapping("board/write")
	public String boardWritePage() {
		return "/board/boardWrite";
	}
	@GetMapping("/board/detail")
	public String boardDetailPage() {
		return "/board/boardDetail";
	}

	
}
