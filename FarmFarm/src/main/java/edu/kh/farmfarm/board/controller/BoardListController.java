package edu.kh.farmfarm.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.board.model.service.BoardListService;

@Controller
public class BoardListController {
	
	@Autowired
	private BoardListService service;
	
	@GetMapping("/board")
	private String boardListPage() {
		return "/board/boardList";
	}

}
