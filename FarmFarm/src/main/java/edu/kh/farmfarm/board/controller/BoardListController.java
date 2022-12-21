package edu.kh.farmfarm.board.controller;

import java.util.List;

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
	
	@GetMapping("/board")
	private String boardListPage(Model model) {
		
//		List<Board> boardTypeList = service.boardTypeList();
		
		return "/board/boardList";
	}
	

}
