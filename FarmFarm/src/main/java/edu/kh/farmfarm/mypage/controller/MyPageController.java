package edu.kh.farmfarm.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.farmfarm.mypage.model.service.MyPageService;

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
	public String myPageComment() {
		return "myPage/myPageComment";
	}
	
	@GetMapping("/myPage/wishList")
	public String myPageWishList() {
		return "myPage/myPageWish";
	}
	

}
