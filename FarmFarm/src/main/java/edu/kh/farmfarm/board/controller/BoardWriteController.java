package edu.kh.farmfarm.board.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.core.config.plugins.validation.constraints.Required;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.board.model.service.BoardWriteService;
import edu.kh.farmfarm.board.model.vo.Board;


@Controller
public class BoardWriteController {
	
	@Autowired
	private BoardWriteService service;
	
	@GetMapping("/board/write")
	private String boardWritePage(Model model) {
		return "board/boardWrite";
	}
	
	
	// 와글와글 글쓰기
	@PostMapping("/board/write")
	private String boardWrite(
			Board board,
			@RequestParam(value="imgs", required = false) List<MultipartFile> imgList,
			@RequestParam(value="boardTypeNo", required=false) int boardTypeNo,
			@RequestHeader("referer") String referer,
			HttpSession session,
			RedirectAttributes ra) {
		
		board.setBoardTypeNo(boardTypeNo);
		
		String webPath = "resources/images/board/";
		
		int boardNo = service.boardWrite(board, imgList);
		
		String path = null;
		String message = null;
		
		return "redirect:" + path;
	}
	

}
