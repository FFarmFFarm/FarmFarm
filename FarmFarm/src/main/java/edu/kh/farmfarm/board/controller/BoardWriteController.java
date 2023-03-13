package edu.kh.farmfarm.board.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.core.config.plugins.validation.constraints.Required;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.farmfarm.board.model.service.BoardWriteService;
import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.member.model.VO.Member;


@SessionAttributes("loginMember")
@Controller
public class BoardWriteController {
	
	@Autowired
	private BoardWriteService service;
	
	@GetMapping("/boards/{boardTypeNo}/writing")
	private String boardWritePage(Model model,
			@PathVariable("boardTypeNo") int boardTypeNo) {
		model.addAttribute("boardTypeNo", boardTypeNo);
		return "board/boardWrite";
	}
	
	
	// 와글와글 글쓰기
	@PostMapping("/boards/writing")
	private String boardWrite(
			Board board,
			@RequestParam(value="imgs", required = false) List<MultipartFile> imgList,
			@RequestHeader("referer") String referer,
			HttpSession session,
			RedirectAttributes ra,
			@SessionAttribute("loginMember") Member loginMember) throws IOException {
		
		int boardTypeNo = board.getBoardTypeNo();
		
		int memberNo = loginMember.getMemberNo();
		board.setMemberNo(memberNo);
		
		String webPath = "/resources/images/board/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		System.out.println(imgList);
		
		int boardNo = service.boardWrite(board, imgList, webPath, folderPath);
		
		String path = null;
		String message = null;
		
		if(boardNo > 0) {
			message="게시글이 등록되었습니다.";
			path = "/boards/"+boardTypeNo+"/"+boardNo;
		}else {
			message = "게시글 등록 실패";
			path = referer;
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
	

}
