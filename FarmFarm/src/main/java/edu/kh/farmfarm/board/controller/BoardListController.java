package edu.kh.farmfarm.board.controller;

import java.util.HashMap;
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
	
	// 와글와글 게시판의 목록 불러오기
	@GetMapping("/board/{boardTypeNo}")
	public String boardList (
			@PathVariable("boardTypeNo") int boardTypeNo,
			Model model,
			@RequestParam(value="cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value="boardSelectNVL", required = false) String boardSelectNVL,
			@RequestParam(value="query", required = false) String query) {
		
		// 검색을 한 경우
		if(query != null) {
			
//			// 최신순, 조회수, 좋아요를 선택한 경우
//			if(boardSelectNVL != null) {
//				Map<String, Object> NVLMap = new HashMap<String, Object>();
//				NVLMap.put("query", query);
//				NVLMap.put("boardTypeNo", boardTypeNo);
//				NVLMap.put("boardSelectNVL", boardSelectNVL);
//				
//			}
			
			Map<String, Object> searchMap = new HashMap<String, Object>();
			searchMap.put("query", query);
			searchMap.put("boardTypeNo", boardTypeNo);
			
			if(boardSelectNVL != null) {
				searchMap.put("boardSelectNVL", boardSelectNVL);
			}
			
			Map<String, Object> boardMap = service.selectBoardList(searchMap, cp);
			model.addAttribute("boardMap", boardMap);
			
		}else {
			
			// 검색을 안한 경우
			Map<String, Object> boardMap = service.selectBoardList(boardTypeNo, cp);
			model.addAttribute("boardMap", boardMap);
			
		}
		
		
//		// 와글와글 게시판 최신순, 조회수, 좋아요 선택 조회
//		System.out.println(boardSelectNVL);
		
		
		return "board/boardList";
	}
	
	
	
	
	

}
