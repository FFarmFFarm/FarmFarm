package edu.kh.farmfarm.board.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.farmfarm.board.model.service.BoardService;
import edu.kh.farmfarm.board.model.vo.Board;

@Controller
public class BoardController {
	
	@Autowired
	private BoardService service;
	
	@GetMapping("/board")
	private String boardListPage(Model model) {
		
		List<Map<String, Object>> boardTypeList = service.boardTypeList();
		model.addAttribute("boardTypeList", boardTypeList);
		
		return "/board/boardList";
	}
	
	@GetMapping("/board/write")
	private String boardWritePage(Model model) {
		return "board/boardWrite";
	}
	
	@PostMapping("/board/write")
	private String boardWrite(
			Board board,
			@RequestParam(value="imgs", required = false) List<MultipartFile> imgList) {
		
		return "redirect:board";
	}

}
