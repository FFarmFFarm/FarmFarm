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
	
//	@GetMapping("/board")
//	private String boardListPage(Model model) {
//		
//		List<Map<String, Object>> boardTypeList = service.boardTypeList();
//		model.addAttribute("boardTypeList", boardTypeList);
//		
//		return "/board/boardList";
//	}
	

}
