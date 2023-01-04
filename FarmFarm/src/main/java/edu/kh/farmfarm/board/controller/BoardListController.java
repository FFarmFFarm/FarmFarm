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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.google.gson.Gson;

import edu.kh.farmfarm.board.model.service.BoardListService;
import edu.kh.farmfarm.board.model.vo.Board;
import edu.kh.farmfarm.member.model.VO.Member;

//@RestController
@SessionAttributes({"loginMember"})
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
			@RequestParam Map<String, Object> pm) {
		
//			// 검색 안하는 경우
			if(pm == null) {
				pm.put("key", "t");
				pm.put("query", null);
			}

			pm.put("boardTypeNo", boardTypeNo);
			
			Map<String, Object> boardMap = service.selectBoardList(pm, cp);
			model.addAttribute("boardMap", boardMap);
			
		return "board/boardList";
	}
	
	
//	// 와글와글 게시판의 목록 불러오기
	// + ajax로 요청한 목록 + 정렬
	@GetMapping("/board/list/{boardTypeNo}")
	@ResponseBody
	public String boardList (
			Model model,
			@PathVariable("boardTypeNo") int boardTypeNo,
			@RequestParam(value="cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value="sort", required = false, defaultValue = "new") String sort,
			@RequestParam(value="query", required = false) String query) {
		
		
		Map<String, Object> searchMap = new HashMap<String, Object>();
		
		searchMap.put("query", query);
		searchMap.put("boardTypeNo", boardTypeNo);
		searchMap.put("sort", sort);
		
		Map<String, Object> boardMap = new HashMap<String, Object>();
		
		boardMap = service.selecBoardtListSearch(searchMap, cp);
		boardMap.put("query", query);
		boardMap.put("sort", sort);
		model.addAttribute("boardMap", boardMap);
		
		return new Gson().toJson(boardMap);
	}


	// 프로필 클릭시 모달
	@GetMapping("/board/member/{memberNo}")
	@ResponseBody
	public String selectMemPro(
			@SessionAttribute("loginMember") Member loginMember,
			@PathVariable("memberNo") int memberNo
			) {
		Member member = new Member();
		member.setMemberNo(memberNo);

		member = service.selectMember(memberNo);

		return new Gson().toJson(member);
	}



}
