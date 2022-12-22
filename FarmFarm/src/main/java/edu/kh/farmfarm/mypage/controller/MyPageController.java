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
	
	
	/** 마이페이지 이동(주문목록)
	 * @return
	 */
	@GetMapping("/member/myPage")
	public String myPage(
			@SessionAttribute("loginMember")Member loginMember,
			Model model,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp
			) {
		
		Map<String, Object> map = service.selectOrderList(loginMember, cp);
		
		model.addAttribute("map", map);
		
		return "myPage/myPageOrder";
	}
	
	
	





	/** 마이페이지 작성 후기
	 * @return
	 */
	@GetMapping("/myPage/review")
	public String myPageReview() {
		return "myPage/myPageReview";
	}
	
	
	/** 마이패이지 작성 게시글
	 * @return
	 */
	@GetMapping("/myPage/board")
	public String myPageBoard() {
		return "myPage/myPageBoard";
	}
	
	
	
	/** 마이페이지 작성 댓글
	 * @param model
	 * @param cp
	 * @return
	 */
	@GetMapping("/myPage/comment")
	public String myPageComment(
			@SessionAttribute("loginMember")Member loginMember, 
			Model model,
			@RequestParam(value="cp", required=false, defaultValue = "1") int cp) {
		

		int memberNo = loginMember.getMemberNo();
		          
		Map<String, Object> map = service.selectCommentList(memberNo, cp);
		
		
		

		model.addAttribute("map", map);

		
		return "myPage/myPageComment";
	}
	
	
	
	/** 마이페이지 찜목록
	 * @return
	 */
	@GetMapping("/myPage/wishList")
	public String myPageWishList() {
		return "myPage/myPageWish";
	}
	

}
