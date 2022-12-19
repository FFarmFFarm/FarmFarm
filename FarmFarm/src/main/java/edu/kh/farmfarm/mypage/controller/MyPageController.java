package edu.kh.farmfarm.mypage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyPageController {
	
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
