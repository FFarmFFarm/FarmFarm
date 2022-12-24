package edu.kh.farmfarm.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.farmfarm.board.model.service.BoardDetailService;
import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.member.model.VO.Member;

@Controller
public class BoardDetailController {
	
	@Autowired
	private BoardDetailService serivce;
	
	// 게시글 상세보기
	@GetMapping("/board/{boardTypeNo}/{boardNo}")
	public String boardDetailPage(
			@PathVariable("boardTypeNo") int boardTypeNo,
			@PathVariable("boardNo") int boardNo,
			Model model,
			@SessionAttribute(value="loginMember", required = false) Member loginMember) {
		
		Board board = serivce.boardDetail(boardNo);
		
		model.addAttribute("board", board);
		
		return "/board/boardDetail";
	}

	
}
