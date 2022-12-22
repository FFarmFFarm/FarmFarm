package edu.kh.farmfarm.board.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import edu.kh.farmfarm.board.model.service.BoardListService;
import edu.kh.farmfarm.board.model.vo.Board;

@Controller
public class BoardListController {
	
	@Autowired
	private BoardListService service;
	
	
	// 와글와글 게시판으로 이동 - 물물교환 페이지
	@GetMapping("/board")
	private String boardListPage(Model model) {
		
		// 와글와글 게시판의 네브 불러오기
		List<Map<String, Object>> boardTypeList = service.boardTypeList();
		model.addAttribute("boardTypeList", boardTypeList);
		
		return "/board/boardList";
	}
	
	// 와글와글 게시판의 목록
	@GetMapping("/board/{boardTypeNo}")
	public String boardList (
			@PathVariable("boardTypeNo") int boardTypeNo,
			Model model,
			@RequestParam(value="cp", required = false, defaultValue = "1") int cp) {
		
		Map<String, Object> boardMap = service.selectBoardList(boardTypeNo, cp);
		
		model.addAttribute("boardMap", boardMap);
		
		return null;
	}
	
	
	
	

}
