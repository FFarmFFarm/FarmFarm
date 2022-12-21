package edu.kh.farmfarm.mypage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.farmfarm.member.model.VO.Member;
import edu.kh.farmfarm.mypage.model.service.MyPageService;
import edu.kh.farmfarm.mypage.model.vo.Comment;

@Controller
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
	@GetMapping("/member/myPage")
	public String myPage() {
		return "myPage/myPageOrder";
	}
	
	@GetMapping("/myPage/order")
	public String myPageOrder() {
		return "myPage/myPageOrder";
	}
	
	@GetMapping("/myPage/review")
	public String myPageReview() {
		return "myPage/myPageReview";
	}
	
	@GetMapping("/myPage/board")
	public String myPageBoard() {
		return "myPage/myPageBoard";
	}
	
	@GetMapping("/myPage/comment")
	public String myPageComment(
//			@SessionAttribute("loginMember")Member loginMember, 
			Model model,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp) {
		

//		임시 변수 할당
		int memberNo = 16;
		
		Map<String, Object> map = service.selectCommentList(memberNo, cp);
		
		
		

		model.addAttribute("map", map);

		
		return "myPage/myPageComment";
	}
	
	
	
	@GetMapping("/myPage/wishList")
	public String myPageWishList() {
		return "myPage/myPageWish";
	}
	

}
