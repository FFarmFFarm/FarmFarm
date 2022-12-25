package edu.kh.farmfarm.board.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.farmfarm.board.model.service.BoardDetailService;
import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.common.Util;
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
		
		// 로그인멤버가 좋아요 눌렀는지 확인
		if(board != null) {
			
			Map<String, Object> likeMap = new HashMap<String, Object>();
			likeMap.put("boardNo2", boardNo);
			likeMap.put("memberNo2", loginMember.getMemberNo());
			
			int result = serivce.checkLike(likeMap);
			
			if(result>0) {
				model.addAttribute("likeCheck", "like");
			}
			
		}
		
		
		
		model.addAttribute("board", board);
		
		return "/board/boardDetail";
	}
	
	// 게시글 좋아요++
	@GetMapping("/boardLikeInsert")
	@ResponseBody
	public int boardLikeInsert(
			@RequestParam Map<String, Object> likeMap) {
		return serivce.boardLikeInsert(likeMap);
	}
	
	
	// 게시글 취소ㅜ
	@GetMapping("/boardLikeDelete")
	@ResponseBody
	public int boardLikeDelete(
			@RequestParam Map<String, Object> likeMap) {
		return serivce.boardLikeDelete(likeMap);
	}
		
	
	
	// 게시글 수정하기 페이지 이동
	@GetMapping("/board/{boardTypeNo}/{boardNo}/update")
	public String boardUpdatePage(
			@PathVariable("boardTypeNo") int boardTypeNo,
			@PathVariable("boardNo") int boardNo,
			Model model) {
		
		Board board = serivce.boardDetail(boardNo);
		
		// 개행문자 처리
		board.setBoardContent(Util.newLineClear(board.getBoardContent()));
		
		model.addAttribute("board", board);
		
		return "board/boardUpdate";
	}
//	public String boardUpdate(
//			@PathVariable("boardTypeNo") int boardTypeNo,
//			@PathVariable("boardNo") int boardNo,
//			Board board,
//			Model model,
//			) {
//		return null;
//	}

	
}
